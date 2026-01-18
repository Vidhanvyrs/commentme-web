import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { ChevronRight } from 'lucide-react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const DashBoardPage = () => {
    const [codebases, setCodebases] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedCodebase, setSelectedCodebase] = useState(null)
    const [comments, setComments] = useState({})
    const [commentsLoading, setCommentsLoading] = useState(false)
    const [selectedLineRange, setSelectedLineRange] = useState(null)
    const [notes, setNotes] = useState('')
    const [originalNote, setOriginalNote] = useState('') // Track original value
    const [updateLoading, setUpdateLoading] = useState(false)

    // AI Modal State
    const [showAIModal, setShowAIModal] = useState(false)
    const [aiStep, setAiStep] = useState('MENU') // MENU, TRANSLATE_CONFIG, RESULT
    const [aiResult, setAiResult] = useState('')
    const [isAiLoading, setIsAiLoading] = useState(false)
    const [targetLanguage, setTargetLanguage] = useState('Spanish')
    const [aiAction, setAiAction] = useState(null) // 'SUMMARIZE' or 'TRANSLATE'
    const [selectedModel, setSelectedModel] = useState('meta-llama/llama-3.3-70b-instruct:free')

    const FREE_MODELS = [
        "openai/gpt-oss-120b:free",
        "xiaomi/mimo-v2-flash:free",
        "mistralai/devstral-2512:free",
        "tngtech/deepseek-r1t2-chimera:free",
        "deepseek/deepseek-r1-0528:free",
        "qwen/qwen3-coder:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "google/gemma-3-27b-it:free",
        "nvidia/nemotron-3-nano-30b-a3b:free",
        "bytedance-seed/seedream-4.5",
        "z-ai/glm-4.5-air:free"
    ]

    // Pagination state
    const [codebasePage, setCodebasePage] = useState(0)
    const [lineRangePage, setLineRangePage] = useState(0)
    const ITEMS_PER_PAGE = 5

    useEffect(() => {
        const fetchCodebases = async () => {
            try {
                setLoading(true)
                const data = await api.getCodebases()
                setCodebases(data)
                setError('')
            } catch (err) {
                setError(err.message || 'Failed to load codebases')
                console.error('Error fetching codebases:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchCodebases()
    }, [])

    // Fetch comments when a codebase is selected
    useEffect(() => {
        const fetchComments = async () => {
            if (!selectedCodebase) {
                setComments({})
                return
            }

            try {
                setCommentsLoading(true)
                const data = await api.getComments(selectedCodebase)
                setComments(data)
                // Reset selected line and notes when switching codebases
                setSelectedLineRange(null)
                setNotes('')
                setLineRangePage(0) // Reset line range pagination
            } catch (err) {
                console.error('Error fetching comments:', err)
                setComments({})
            } finally {
                setCommentsLoading(false)
            }
        }

        fetchComments()
    }, [selectedCodebase])

    // Handle line range selection
    const handleLineRangeClick = (lineRange) => {
        setSelectedLineRange(lineRange)
        // Set the note value from comments if it exists
        const comment = comments[lineRange]
        setNotes(comment || '')
        setOriginalNote(comment || '') // Store original value
    }

    const handleUpdate = async () => {
        if (!selectedLineRange || !selectedCodebase || !notes.trim()) {
            return
        }

        try {
            setUpdateLoading(true)
            await api.updateComment(selectedLineRange, selectedCodebase, notes)

            // Update local comments state
            setComments(prev => ({
                ...prev,
                [selectedLineRange]: notes
            }))

            // Update original note to new value
            setOriginalNote(notes)

            console.log('Comment updated successfully')
        } catch (err) {
            console.error('Error updating comment:', err)
            alert(err.message || 'Failed to update comment')
        } finally {
            setUpdateLoading(false)
        }
    }

    // Check if notes have changed from original
    const hasNotesChanged = notes.trim() !== '' && notes !== originalNote

    // Pagination helpers
    const getPaginatedCodebases = () => {
        const start = codebasePage * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        return codebases.slice(start, end)
    }

    const getPaginatedLineRanges = () => {
        const lineRanges = Object.keys(comments)
        const start = lineRangePage * ITEMS_PER_PAGE
        const end = start + ITEMS_PER_PAGE
        return lineRanges.slice(start, end)
    }

    const handleNextCodebasePage = () => {
        if ((codebasePage + 1) * ITEMS_PER_PAGE < codebases.length) {
            setCodebasePage(codebasePage + 1)
        }
    }

    const handlePrevCodebasePage = () => {
        if (codebasePage > 0) {
            setCodebasePage(codebasePage - 1)
        }
    }

    const handleNextLineRangePage = () => {
        const totalLineRanges = Object.keys(comments).length
        if ((lineRangePage + 1) * ITEMS_PER_PAGE < totalLineRanges) {
            setLineRangePage(lineRangePage + 1)
        }
    }

    const handlePrevLineRangePage = () => {
        if (lineRangePage > 0) {
            setLineRangePage(lineRangePage - 1)
        }
    }

    const handleAIOpen = () => {
        setShowAIModal(true)
        setAiStep('MENU')
        setAiResult('')
        setAiAction(null)
    }

    const handleAIClose = () => {
        setShowAIModal(false)
    }

    const handleAIActionSelect = (action) => {
        setAiAction(action)
        if (action === 'SUMMARIZE' || action === 'UNDERSTAND') {
            handleAISubmit(action)
        } else if (action === 'TRANSLATE') {
            setAiStep('TRANSLATE_CONFIG')
        }
    }

    const handleAISubmit = async (action, lang = null) => {
        try {
            setIsAiLoading(true)
            setAiStep('RESULT')
            let result;
            if (action === 'SUMMARIZE') {
                const response = await api.summarize(notes, selectedModel)
                result = response.summary
            } else if (action === 'TRANSLATE') {
                const response = await api.translate(notes, lang || targetLanguage, selectedModel)
                result = response.translation
            } else if (action === 'UNDERSTAND') {
                const response = await api.explain(notes, selectedModel)
                result = response.explanation
            }
            setAiResult(result)
        } catch (err) {
            console.error('AI Error:', err)
            setAiResult('Error: ' + err.message)
        } finally {
            setIsAiLoading(false)
        }
    }

    const handleReplace = () => {
        setNotes(aiResult)
        handleAIClose()
    }

    return (
        <div className='min-h-screen bg-[#242424] text-white p-8 relative'>

            {/* AI Modal */}
            {showAIModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1e1e1e] border border-white/10 rounded-xl w-full max-w-md p-6 shadow-2xl">
                        {aiStep === 'MENU' && (
                            <>
                                <h3 className="text-xl font-bold mb-6 text-center">AI Bliss</h3>

                                <div className="mb-6">
                                    <label className="text-sm text-gray-400 mb-2 block">Select Model</label>
                                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                                        <SelectTrigger className="w-full bg-white/5 border-white/10">
                                            <SelectValue placeholder="Select AI Model" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e1e] border border-white/10 text-white max-h-[200px]">
                                            <SelectGroup>
                                                {FREE_MODELS.map((model) => (
                                                    <SelectItem key={model} value={model}>{model}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => handleAIActionSelect('SUMMARIZE')}
                                        className="w-full hover:cursor-pointer bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="bg-orange-500/20 p-2 rounded-full text-orange-400 group-hover:bg-orange-500/30">📝</div>
                                        <span className="font-medium">Summarize this note</span>
                                    </button>
                                    <button
                                        onClick={() => handleAIActionSelect('TRANSLATE')}
                                        className="w-full hover:cursor-pointer bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="bg-blue-500/20 p-2 rounded-full text-blue-400 group-hover:bg-blue-500/30">🌐</div>
                                        <span className="font-medium">Translate this note</span>
                                    </button>
                                    <button
                                        onClick={() => handleAIActionSelect('UNDERSTAND')}
                                        className="w-full hover:cursor-pointer bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="bg-purple-500/20 p-2 rounded-full text-purple-400 group-hover:bg-purple-500/30">💡</div>
                                        <span className="font-medium">Make me understand</span>
                                    </button>
                                </div>
                                <div className="flex justify-between mt-8">
                                    <button onClick={handleAIClose} className="px-4 hover:cursor-pointer py-2 text-gray-400 hover:text-white transition-colors">leave it</button>
                                </div>
                            </>
                        )}

                        {aiStep === 'TRANSLATE_CONFIG' && (
                            <>
                                <h3 className="text-xl font-bold mb-6 text-center">Choose Language</h3>
                                <div className="space-y-4">
                                    <Select value={targetLanguage}
                                        onValueChange={(value) => setTargetLanguage(value)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a language" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e1e] border border-white/10 rounded-lg p-3 text-white">
                                            <SelectGroup>
                                                <SelectLabel>Languages</SelectLabel>
                                                <SelectItem value="English">English</SelectItem>
                                                <SelectItem value="Hindi">Hindi</SelectItem>
                                                <SelectItem value="Spanish">Spanish</SelectItem>
                                                <SelectItem value="French">French</SelectItem>
                                                <SelectItem value="German">German</SelectItem>
                                                <SelectItem value="Japanese">Japanese</SelectItem>
                                                <SelectItem value="Chinese">Chinese</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                                <div className="flex justify-between mt-8">
                                    <button onClick={() => setAiStep('MENU')} className="px-4 hover:cursor-pointer py-2 text-gray-400 hover:text-white transition-colors">back</button>
                                    <button
                                        onClick={() => handleAISubmit('TRANSLATE')}
                                        className="bg-white hover:cursor-pointer text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        lets go
                                    </button>
                                </div>
                            </>
                        )}

                        {aiStep === 'RESULT' && (
                            <>
                                <h3 className="text-xl font-bold mb-4 text-center">
                                    {isAiLoading ? 'Generating...' : 'AI Result'}
                                </h3>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 min-h-[150px] max-h-[300px] overflow-y-auto">
                                    {isAiLoading ? (
                                        <div className='flex items-center justify-center h-full py-8'>
                                            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{aiResult}</p>
                                    )}
                                </div>
                                {!isAiLoading && (
                                    <div className="flex justify-between mt-6">
                                        <button onClick={handleAIClose} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">leave it</button>
                                        <button
                                            onClick={handleReplace}
                                            className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                        >
                                            Replace
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className='max-w-7xl mx-auto'>
                <h1 className='text-3xl font-bold mb-8'>Your Dashboard</h1>

                {loading && (
                    <div className='flex items-center justify-center py-12'>
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}

                {error && (
                    <div className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded'>
                        {error}
                    </div>
                )}

                {!loading && !error && codebases.length === 0 && (
                    <div className='bg-white/5 border border-white/10 rounded-lg p-8 text-center'>
                        <p className='text-gray-400'>No codebases found. Upload your first codebase to get started!</p>
                    </div>
                )}

                {!loading && !error && codebases.length > 0 && (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                        {/* Left Column - Codebases List */}
                        <div className='lg:col-span-1'>
                            <div className='bg-white/5  border border-white/10 rounded-lg overflow-hidden'>
                                <div className='bg-blue-400/50 px-6 py-4 border-b border-white/10'>
                                    <h2 className='text-xl font-semibold'>Your Codebases</h2>
                                </div>
                                <div className='divide-y divide-white/10'>
                                    {getPaginatedCodebases().map((codebase, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedCodebase(codebase)}
                                            className={`px-6 py-4 flex items-center justify-between cursor-pointer transition-colors ${selectedCodebase === codebase
                                                ? 'bg-white/20'
                                                : 'hover:bg-white/10'
                                                }`}
                                        >
                                            <span className='text-lg'>{codebase}</span>
                                            <ChevronRight className='w-5 h-5 text-gray-400' />
                                        </div>
                                    ))}
                                </div>
                                {codebases.length > ITEMS_PER_PAGE && (
                                    <div className='px-6 py-4 border-t border-white/10 flex justify-center gap-4'>
                                        <button
                                            onClick={handlePrevCodebasePage}
                                            disabled={codebasePage === 0}
                                            className={`transition-colors ${codebasePage === 0
                                                ? 'text-gray-600 cursor-not-allowed'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNextCodebasePage}
                                            disabled={(codebasePage + 1) * ITEMS_PER_PAGE >= codebases.length}
                                            className={`transition-colors ${(codebasePage + 1) * ITEMS_PER_PAGE >= codebases.length
                                                ? 'text-gray-600 cursor-not-allowed'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Line Ranges and Notes */}
                        <div className='lg:col-span-2'>
                            <div className='bg-white/5 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col'>
                                <div className='bg-blue-400/50 px-6 py-4 border-b border-white/10'>
                                    <h2 className='text-xl font-semibold'>Line-by-Line</h2>
                                </div>

                                <div className='flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                                    {/* Line Ranges Column */}
                                    <div className='space-y-3 max-h-[500px] overflow-y-auto pr-2'>
                                        {!selectedCodebase && (
                                            <div className='text-center text-gray-400 py-8'>
                                                Select a codebase to view comments
                                            </div>
                                        )}

                                        {selectedCodebase && commentsLoading && (
                                            <div className='flex items-center justify-center py-8'>
                                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        )}

                                        {selectedCodebase && !commentsLoading && Object.keys(comments).length === 0 && (
                                            <div className='text-center text-gray-400 py-8'>
                                                No comments found for this codebase
                                            </div>
                                        )}

                                        {selectedCodebase && !commentsLoading && getPaginatedLineRanges().map((lineRange, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleLineRangeClick(lineRange)}
                                                className={`border rounded px-4 py-3 transition-colors cursor-pointer ${selectedLineRange === lineRange
                                                    ? 'bg-blue-400/30 border-blue-400'
                                                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    }`}
                                            >
                                                <span className='text-sm'>Line #{lineRange}</span>
                                            </div>
                                        ))}

                                        {selectedCodebase && !commentsLoading && Object.keys(comments).length > ITEMS_PER_PAGE && (
                                            <div className='flex justify-center gap-4 pt-2'>
                                                <button
                                                    onClick={handlePrevLineRangePage}
                                                    disabled={lineRangePage === 0}
                                                    className={`transition-colors ${lineRangePage === 0
                                                        ? 'text-gray-600 cursor-not-allowed'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={handleNextLineRangePage}
                                                    disabled={(lineRangePage + 1) * ITEMS_PER_PAGE >= Object.keys(comments).length}
                                                    className={`transition-colors ${(lineRangePage + 1) * ITEMS_PER_PAGE >= Object.keys(comments).length
                                                        ? 'text-gray-600 cursor-not-allowed'
                                                        : 'text-gray-400 hover:text-white'
                                                        }`}
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes Column */}
                                    <div className='flex flex-col'>
                                        <div className='flex-1 mb-4'>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Notes written for particular lines and accordingly user can directly update it as it is text canvas the update button will lit up once any changes are done"
                                                className='w-full h-full min-h-[300px] bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none'
                                            />
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <button
                                                onClick={handleAIOpen}
                                                disabled={!selectedLineRange}
                                                className={` bg-orange-500/20 border border-orange-500 text-orange-500 rounded-lg p-3 transition-colors ${selectedLineRange ? 'hover:bg-orange-500/30 hover:cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                ✨
                                            </button>
                                            <button
                                                onClick={handleUpdate}
                                                disabled={!hasNotesChanged || updateLoading}
                                                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${hasNotesChanged && !updateLoading
                                                    ? 'bg-white text-black hover:bg-gray-200 hover:cursor-pointer'
                                                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                {updateLoading ? 'Updating...' : 'Update'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashBoardPage