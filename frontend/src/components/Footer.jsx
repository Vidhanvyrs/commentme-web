import React from 'react'
import logo from '../assets/bicon.png'
const Footer = () => {
    const FOOTER_LINKS = [
        {
            label: "PRODUCT",
            links: ["SKILLS", "INTEGRATIONS", "PRICING", "LOGIN", "SIGN UP"]
        },
        {
            label: "WHO USES COMMENTME",
            links: ["SALES", "FINANCIAL ADVISORS", "EXECUTIVES", "RECRUITERS", "ASSISTANTS"]
        },
        {
            label: "RESOURCES",
            links: ["HELP", "USE CASES", "BLOG"]
        },
        {
            label: "LEGAL",
            links: ["PRIVACY", "TERMS", "SECURITY"]
        }
    ]
    return (
        <div className="border-t border-white/10 px-2 py-2 text-[10px] tracking-[0.2em] font-medium text-gray-400 uppercase -mt-2">
            <div className="flex flex-col space-y-12 m-10">
                {FOOTER_LINKS.map((row, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between group hover:text-white transition-colors duration-500">
                        <div className="mb-2 md:mb-0 text-white text-[12px] font-bold">{row.label}</div>
                        <div className="flex flex-wrap gap-x-2 gap-y-1">
                            {row.links.map((link, linkIdx) => (
                                <React.Fragment key={linkIdx}>
                                    <a href="#" className="hover:text-[#F4D06F] transition-colors">{link}</a>
                                    {linkIdx !== row.links.length - 1 && <span className="text-gray-700">/</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end border-white/10 p-0.75">
                <div className="flex items-center gap-4 mb-8 md:mb-0">
                    <div className="text-2xl text-white font-normal lowercase tracking-tighter flex items-center gap-2">
                        <img src={logo} alt="CommentMe Logo" className='rounded w-16 h-16 hover:cursor-pointer' /> Commentme
                    </div>
                    <span className="text-gray-600">© 2025 COMMENTME</span>
                </div>

                <div className="flex gap-4">
                    <a href="#" className="hover:text-[#3e9cc4ff] transition-colors">LINKEDIN</a>
                    <span className="text-gray-700">/</span>
                    <a href="#" className="hover:text-[#3e9cc4ff] transition-colors">X</a>
                    <span className="text-gray-700">/</span>
                    <a href="#" className="hover:text-[#3e9cc4ff] transition-colors">YOUTUBE</a>
                    <span className="text-gray-700">/</span>
                    <a href="#" className="hover:text-[#3e9cc4ff] transition-colors">INSTAGRAM</a>
                </div>
            </div>
        </div>
    )
}

export default Footer