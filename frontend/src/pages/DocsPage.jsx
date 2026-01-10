import React, { useState } from 'react';
import { Search, Copy, Check, ChevronRight, ChevronDown, ExternalLink } from 'lucide-react';

const DocsPage = () => {
    const [copied, setCopied] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleCopy = () => {
        const content = `Welcome to commentme-CLI documentation...`;
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sidebarItems = [
        {
            title: 'Overview',
            items: ['Introduction', 'Architecture overview', 'Contribution guide']
        },
        {
            title: 'Get started',
            items: ['Installation', 'Examples & Demos', 'Connection']
        },
        {
            title: 'CLI & Web',
            items: ['Introduction', 'Commands', 'AI Bliss']
        }
    ];

    const onThisPage = [
        'Introduction',
        'commentme-CLI overview',
        'Navigating the documentation',
    ];

    return (
        <div className="flex bg-transparent min-h-screen text-[#e5e5e5] font-sans">
            {/* Left Sidebar */}
            <aside className="w-64 border-r border-[#1f1f1f] sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block scrollbar-hide">
                <div className="p-6 space-y-8">
                    {sidebarItems.map((section, idx) => (
                        <div key={idx}>
                            <div className="flex items-center justify-between text-[13px] font-semibold text-[#888] uppercase tracking-wider mb-4 cursor-pointer group">
                                {section.title}
                                <ChevronDown className="w-4 h-4 text-[#444] group-hover:text-[#888] transition-colors" />
                            </div>
                            <ul className="space-y-1">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <a
                                            href="#"
                                            className={`block px-3 py-1.5 text-[14px] rounded-md transition-all ${item === 'Introduction' && section.title === 'Overview'
                                                ? 'bg-[#a78bfa]/20 text-[#a78bfa] font-medium border border-[#a78bfa]/30'
                                                : 'text-[#aaa] hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Welcome to commentme-CLI documentation
                </h1>

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 mb-12 bg-[#1a1a1a] border border-[#333] rounded-md text-[13px] text-[#aaa] hover:bg-[#222] hover:text-white transition-all group"
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4 group-hover:text-[#a78bfa]" />
                            <span>Copy as Markdown</span>
                        </>
                    )}
                </button>

                <div className="prose prose-invert max-w-none space-y-12">
                    <section id="introduction">
                        <p className="text-[#aaa] text-lg leading-relaxed">
                            This documentation provides a comprehensive guide to installing, using, and developing
                            commentme-CLI, a tool that lets you clean your codebase of comments and store them seperately with references and AI bliss.
                        </p>
                    </section>

                    <section id="commentme-cli-overview">
                        <h2 className="text-3xl font-bold text-white mb-6 pt-4 border-t border-[#1f1f1f]">
                            commentme-CLI overview
                        </h2>
                        <p className="text-[#aaa] leading-relaxed mb-6">
                            commentme-CLI brings the capabilities of a developer to clear out the noises of comments from your codebase and let you focus on one thing at a time and if confused about anything then with just one command you can refer the comments back and clear up all the confusions.
                            <br />
                            <br />
                            Through the commands you can <code className="text-[#a78bfa]">skim</code>, <code className="text-[#a78bfa]">edit</code>, <code className="text-[#a78bfa]">delete</code>, <code className="text-[#a78bfa]">unskim</code>, <code className="text-[#a78bfa]">translate</code> and <code className="text-[#a78bfa]">summarize</code> your comments of your codebase.
                            <br />
                            <br />
                            The sole purpose of creating this tool is to make your cluttered codebase clean and more easy to navigate with proper references of the comments in case of any confusion that all too with special AI features like summarization and translations of comments to make it more accessible to you
                        </p>
                    </section>

                    <section id="navigating-the-documentation">
                        <h2 className="text-3xl font-bold text-white mb-6 pt-4 border-t border-[#1f1f1f]">
                            Navigating the documentation
                        </h2>
                        <p className="text-[#aaa] leading-relaxed mb-4">
                            This documentation is organized into the following sections:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['Installation', 'Core Concepts', 'Tool Reference', 'Configuration'].map((topic, idx) => (
                                <div key={idx} className="p-4 bg-[#111] border border-[#1f1f1f] rounded-lg hover:border-[#a78bfa]/50 transition-all cursor-pointer group">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-white group-hover:text-[#a78bfa] transition-all">{topic}</h3>
                                        <ExternalLink className="w-4 h-4 text-[#444]" />
                                    </div>
                                    <p className="text-sm text-[#888]">Comprehensive guide about {topic.toLowerCase()} for all users.</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-80 border-l border-[#1f1f1f] sticky top-16 h-[calc(100vh-64px)] overflow-y-auto hidden xl:block p-8 scrollbar-hide">
                {/* Search Bar */}
                <div className="relative mb-10">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
                    <input
                        type="text"
                        placeholder="Search documentation"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#111] border border-[#222] rounded-lg py-2 pl-10 pr-10 text-[14px] text-white focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all placeholder:text-[#444]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border border-[#333] rounded px-1.5 py-0.5 bg-[#1a1a1a]">
                        <span className="text-[10px] text-[#555] font-medium">Ctrl K</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-[13px] font-bold text-white uppercase tracking-widest">On this page</h4>
                    <ul className="space-y-3">
                        {onThisPage.map((item, idx) => (
                            <li key={idx}>
                                <a
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                    className={`text-[13px] transition-all hover:text-white ${idx === 0 ? 'text-[#a78bfa] font-medium border-l-2 border-[#a78bfa] pl-4' : 'text-[#888] pl-4'
                                        }`}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default DocsPage;