import React, { useState, useEffect } from 'react'
import api from '../services/api'
import { ChevronRight } from 'lucide-react'

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

    return (
        <div className='min-h-screen bg-[#242424] text-white p-8'>
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
                                            <button className='bg-orange-500/20 border border-orange-500 text-orange-500 rounded-lg p-3 hover:bg-orange-500/30 transition-colors hover:cursor-pointer'>
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