import React, { useState } from 'react'
import { Video, FileSearch, Send, Feather, SquarePen, FilePlus, CheckSquare, UserPlus, List, BadgeDollarSign, LayoutTemplate, ArrowRight, Minus, Plus, Database, FileText, Languages, Github, Copy, Check } from 'lucide-react'
import { DotPattern } from "@/components/ui/dot-pattern"
import { cn } from "@/lib/utils"
import { Globe } from "@/components/ui/globe"
import { Highlighter } from "@/components/ui/highlighter"

import {
    ScrollVelocityContainer,
    ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity"
import vscode from "../assets/vscode.png"
import cursor from "../assets/cursor.png"
import antigravity from "../assets/antigravity.png"
import astudio from "../assets/astudio.png"
import intellij from "../assets/intellij.png"
import pycharm from "../assets/pycharm.png"
import webstorm from "../assets/webstorm.png"
import jetbrains from "../assets/jetbrains.png"
import neovim from "../assets/neovim.png"
import notepad from "../assets/notepad.png"
import sublime from "../assets/sublime.png"
import tabnine from "../assets/tabnine.png"
import trae from "../assets/trae.png"
import windsuf from "../assets/windsurf.svg"
import zed from "../assets/zed.png"
import { Link, useNavigate } from 'react-router-dom'

const SKILLS_DATA = [
    {
        icon: Video,
        title: "Automate your codebase cleanup"
    },
    {
        icon: FileSearch,
        title: "Identify and remove dead comments"
    },
    {
        icon: Send,
        title: "Draft improved documentation"
    },
    {
        icon: Feather,
        title: "Match your team's tone"
    },
    {
        icon: SquarePen,
        title: "Update standard headers"
    }
]

const SKILLS_EXPANSION_DATA = [
    {
        icon: FilePlus,
        title: "Add notes to contacts and households"
    },
    {
        icon: CheckSquare,
        title: "Create and assign tasks from meeting notes"
    },
    {
        icon: UserPlus,
        title: "Create new contact records in CRM"
    },
    {
        icon: List,
        title: "Set task and calendar reminders"
    },
    {
        icon: BadgeDollarSign,
        title: "Create new deal from product lines"
    },
    {
        icon: LayoutTemplate,
        title: "Create context-aware outputs from templates"
    }
]

const IDE_LOGOS = [
    vscode,
    cursor,
    intellij,
    antigravity,
    astudio,
    pycharm,
    jetbrains,
    neovim,
    notepad,
    webstorm,
    sublime,
    tabnine,
    trae,
    windsuf,
    zed
]

const WHO_USES_DATA = [
    {
        title: "Developers",
        description: "Stay focused on code while Commentme turns comments into documentation and tasks automatically."
    },
    {
        title: "Team Leads",
        description: "Track codebase health and ensuring standards are met."
    },
    {
        title: "Product Managers",
        description: "Gain insights into technical debt and feature progress."
    },
    {
        title: "Open Source Maintainers",
        description: "Automate community guidelines enforcement."
    }
]


const HomePage = () => {
    const [activeTab, setActiveTab] = useState(0)
    const navigate = useNavigate()
    const loginPage = () => {
        navigate("/login")
    }
    const command = "npm install -g commentme-cli";
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    return (
        <div className="text-white font-sans relative overflow-hidden h-full w-full">
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(60vw_60vh_ellipse_at_top,white,transparent)]",
                    "white/5"
                )}
            />

            <div className="py-24 px-4 text-center border-b border-white/10 relative z-10">
                <h1 className="text-6xl md:text-8xl font-normal tracking-tight mb-8">
                    Clean your <br />
                    <Highlighter action="underline" color="#3e9cc4ff">cluttered codebase</Highlighter> with commentme
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                    <Highlighter action="underline" color="#3e9cc4ff">Commentme-CLI</Highlighter> handles each and every comment in your codebase, cleans it and <br className="hidden md:block" />
                    saves it in a database. Henceforth, it makes debugging more efficient and easy, Ultimately saving you &nbsp;<Highlighter action="highlight" color="#F4D06F"> <span className="text-black font-bold">  time and effort.</span></Highlighter>
                </p>
                {/* <div className='flex mt-20 items-center justify-center gap-2'>
                    <Github />
                    <div className='border w-80 border-white/10 p-2'>
                        <input type="text" disabled value="npm install -g commentme-cli" className='w-full' />
                    </div>
                </div> */}
                <div className="mt-20 flex items-center gap-2 justify-center">
                    <Github className="h-8 w-8 text-white/80" />
                    <div className="flex items-center gap-3 rounded-xl border border-violet-500/30 bg-black/60 px-4 py-3 backdrop-blur-md">

                        <span className="font-mono text-lg text-white/90">
                            <span className="text-green-400 mr-1">$</span>
                            {command}
                        </span>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="ml-2 rounded-md p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
                            aria-label="Copy command"
                        >
                            {copied ? (
                                <Check className="h-4 w-4 text-green-400" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-md text-gray-400 mt-2">Read the Documentation <Link to="/docs" className="text-blue-400 underline">here</Link></p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-7 border-b border-white/10 text-[11px] uppercase tracking-widest font-medium text-gray-500 relative z-10 bg-[#242424]/80 backdrop-blur-sm">
                <div className="py-6 text-center border-r border-white/10 md:border-b-0 border-b hover:text-white cursor-pointer transition-colors">CLI Installation</div>
                <div className="py-6 text-center border-r border-white/10 md:border-b-0 border-b hover:text-white cursor-pointer transition-colors">Commands</div>
                <div className="py-6 text-center border-r border-white/10 md:border-b-0 border-b hover:text-white cursor-pointer transition-colors">Usage</div>
                <div className="py-6 text-center border-r border-white/10 md:border-b-0 border-b bg-[#F4D06F] text-[#242424] cursor-pointer">Connection</div>
                <div className="py-6 text-center border-r border-white/10 md:border-b-0 border-b hover:text-white cursor-pointer transition-colors">AI Bliss</div>
                <div className="py-6 text-center border-r border-white/10 cursor-pointer hover:text-white transition-colors">Tree</div>
                <div className="py-6 text-center cursor-pointer hover:text-white transition-colors">And more...</div>
            </div>

            <div className="grid md:grid-cols-2 min-h-[600px] relative z-10">
                <div className="border-r border-white/10 bg-[#D2B48C]/5 p-12 relative overflow-hidden group">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1610440049286-a7dc4c995cfd?q=80&w=2666&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                </div>

                <div className="bg-[#D2B48C]/10 p-12 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1621250266205-776269b67946?q=80&w=3540&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                </div>
            </div>

            <div className='grid md:grid-cols-5 h-[100px] relative z-10'>
                <div className="md:col-span-3 border-r border-t border-white/10 p-12 relative overflow-hidden group" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 21px)" }}>
                </div>
                <div className="border-r border-t border-white/10 bg-[#3e9cc4ff] px-5 py-5 text-2xl tracking-wider uppercase hover:bg-white hover:text-[#242424] transition-colors cursor-pointer relative overflow-hidden flex items-center justify-center">
                    Demo
                </div>
                <div className="border-t border-white/10 bg-[#F4D06F] text-[#242424] px-5 py-5 text-2xl tracking-wider uppercase hover:bg-white hover:text-[#242424] transition-colors cursor-pointer relative overflow-hidden flex items-center justify-center" onClick={loginPage}>
                    Get Started
                </div>
            </div>

            {/* Globe Section */}
            <div className="relative z-10 py-24 border-t border-white/10 overflow-hidden">
                <div className="text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-4">
                        We represent Devs Globally
                    </h2>
                    <p className="text-gray-400 font-light max-w-xl mx-auto">
                        For every comments we have our AI to summarize, translate and explain
                    </p>
                </div>
                <div className="relative flex border-b border-white/10 h-[400px] w-full items-center justify-center overflow-hidden">
                    <Globe className="top-5 " />
                </div>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                    <ScrollVelocityContainer className="w-full">
                        <ScrollVelocityRow baseVelocity={20} direction={-1} className="">
                            <div className="border-b border-white/10 p-12 relative overflow-hidden" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 22px)" }}>
                            </div>
                        </ScrollVelocityRow>
                    </ScrollVelocityContainer>
                </div>
            </div>

            <div id='skills' className="relative -mt-26 bg-[#D2B48C]/5 z-10 border-t border-white/10 overflow-hidden">
                <div className="px-6 py-24 max-w-7xl mx-auto">
                    <span className="bg-[#F4D06F] text-[#242424] text-xs font-bold px-2 py-1 uppercase tracking-widest mb-6 inline-block">Skills</span>
                    <h2 className="text-5xl md:text-7xl font-normal tracking-tight mb-8">
                        Say goodbye to <br />
                        busywork, forever
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl font-light leading-relaxed">
                        Commentme learns your preferences and handles tasks the way you would, keeping everything organized without the extra effort.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 border-t border-white/10">
                    {SKILLS_DATA.map((skill, idx) => (
                        <div key={idx} className={`p-8 min-h-[200px] flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group border-b border-white/10 md:border-b-0 ${idx !== SKILLS_DATA.length - 1 ? 'md:border-r' : ''}`}>
                            <skill.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                            <p className="text-lg font-light text-gray-300 group-hover:text-white transition-colors">
                                {skill.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid bg-[#D2B48C]/5 grid-cols-1 md:grid-cols-5 border-t border-white/10">
                <div className="md:col-span-2 md:row-span-2 border-b border-white/10 md:border-r bg-[#D2B48C]/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-105"></div>
                </div>
                {SKILLS_EXPANSION_DATA.map((skill, idx) => (
                    <div key={idx} className={`p-8 min-h-[200px] flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer group border-b border-white/10 ${
                        // Right border logic:
                        // In a 5-col grid, items at index 0, 1, 3, 4 (0-based) in current row need right border.
                        // But here we have a 3-col sub-grid to the right of the image.
                        // Actually, simpler: Just add border-r to everything except if it's the last in its row.
                        // The expansion data has 6 items. They will fill:
                        // Row 1: Image(2 cols) + item0 + item1 + item2
                        // Row 2: Image(cont.) + item3 + item4 + item5
                        // So item0, item1, item3, item4 need right borders.
                        (idx % 3 !== 2) ? 'md:border-r' : ''
                        }`}>
                        <skill.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" strokeWidth={1.5} />
                        <p className="text-lg font-light text-gray-300 group-hover:text-white transition-colors">
                            {skill.title}
                        </p>
                    </div>
                ))}
            </div>
            <div id='integrations' className="relative z-10 py-24 border-t border-white/10  overflow-hidden">
                <div className="text-center relative z-10">
                    <h2 className="text-2xl md:text-4xl font-normal tracking-tight mb-4">
                        Integrate the tool seamlessly into your existing IDE environment to get started.
                    </h2>
                </div>
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
                    <ScrollVelocityContainer className="w-full">
                        <ScrollVelocityRow baseVelocity={2} direction={1} className="py-2">
                            {IDE_LOGOS.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt="Unsplash sample"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                    decoding="async"
                                    className="border border-white/10 inline-block h-30 w-30  object-cover shadow-sm hover:bg-white/30 transition-colors cursor-pointer p-5"
                                />
                            ))}
                        </ScrollVelocityRow>
                    </ScrollVelocityContainer>
                </div>
            </div>

            <div className='relative bg-[#D2B48C]/5 z-10 py-24 border-t border-white/10 overflow-hidden'>
                <div className="grid md:grid-cols-2 min-h-[600px]">
                    <div className="border-r border-white/10 relative overflow-hidden h-[500px] md:h-auto">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                    </div>
                    <div className="p-8 md:p-24 flex flex-col justify-center">
                        <span className="bg-[#3e9cc4ff] text-white text-xs font-bold px-2 py-1 uppercase tracking-widest mb-6 inline-block w-fit">Who uses Commentme</span>
                        <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-12 text-white">
                            Built for people who <br />
                            ship the product <br />
                            fast!
                        </h2>

                        <div className="flex flex-col">
                            {WHO_USES_DATA.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveTab(idx)}
                                    className={`py-6 border-b border-black/10 cursor-pointer group transition-all duration-300`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className={`text-xl font-medium transition-colors ${activeTab === idx ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
                                            {item.title}
                                        </h3>
                                        {activeTab === idx ?
                                            <Minus className="w-5 h-5 text-white" /> :
                                            <Plus className="w-5 h-5 text-gray-500 group-hover:text-white" />
                                        }
                                    </div>

                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-white font-light text-lg mb-4 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center text-white text-xs font-bold tracking-widest uppercase hover:text-[#3e9cc4ff] transition-colors">
                                            Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id='pricing' className='relative z-10 py-24 border-t border-white/10 overflow-hidden'>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <span className="bg-[#F4D06F] text-[#242424] text-xs font-bold px-2 py-1 uppercase tracking-widest mb-8 inline-block">Pricing</span>
                    <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-8 text-white">
                        Get AI features in Commentme-web free for 2 weeks
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
                        Get started free for 14 days. Whether it's just you or your whole team, Commentme gives you
                        the same smart features to handle notes, summarizations and translations automatically.
                    </p>

                    <div className="max-w-md rounded-lg mx-auto mt-16 border border-white/10 bg-[#18181b] overflow-hidden">
                        <div className="bg-[#D2B48C]/5 py-8">
                            <div className="flex items-start justify-center text-[#F4D06F] font-serif">
                                <span className="text-4xl mr-1 font-light">$</span>
                                <span className="text-8xl leading-none font-light">19</span>
                                <div className="flex flex-col justify-end ml-3 mb-2 text-xs font-bold tracking-widest text-white/50 uppercase">
                                    <span>Per</span>
                                    <span>Month</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 text-left">
                            <h4 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-8 text-center text-[#D2B48C]">
                                What Commentme takes off your plate
                            </h4>

                            <ul className="space-y-6">
                                <li className="flex items-center text-gray-300 font-light">
                                    <div className="w-8 h-8 rounded bg-[#F4D06F] text-[#242424] flex items-center justify-center mr-4 flex-shrink-0">
                                        <Database className="w-4 h-4" />
                                    </div>
                                    <span>Store all your comments</span>
                                </li>
                                <li className="flex items-center text-gray-300 font-light">
                                    <div className="w-8 h-8 rounded bg-[#F4D06F] text-[#242424] flex items-center justify-center mr-4 flex-shrink-0">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <span>Summarizes ~10 meetings</span>
                                </li>
                                <li className="flex items-center text-gray-300 font-light">
                                    <div className="w-8 h-8 rounded bg-[#F4D06F] text-[#242424] flex items-center justify-center mr-4 flex-shrink-0">
                                        <Languages className="w-4 h-4" />
                                    </div>
                                    <span>Translates your comments into different languages</span>
                                </li>
                                <li className="flex items-center text-gray-300 font-light">
                                    <div className="w-8 h-8 rounded bg-[#F4D06F] text-[#242424] flex items-center justify-center mr-4 flex-shrink-0">
                                        <Plus className="w-4 h-4" />
                                    </div>
                                    <span>and so much more...</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-[#D2B48C]/5 py-6 text-center text-sm font-medium text-gray-400">
                            All plans include unlimited users
                        </div>
                    </div>

                </div>
            </div>

            <div className="relative border-t border-white/10 flex w-full flex-col items-center justify-center overflow-hidden">
                <ScrollVelocityContainer className="w-full">
                    <ScrollVelocityRow baseVelocity={20} direction={-1} className="">
                        <div className="border-b border-white/10 p-12 relative overflow-hidden" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 22px)" }}>
                        </div>
                    </ScrollVelocityRow>
                </ScrollVelocityContainer>
            </div>
        </div>
    )
}

export default HomePage