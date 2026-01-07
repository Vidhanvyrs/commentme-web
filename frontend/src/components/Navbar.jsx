import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/bicon.png'
import logo2 from '../assets/icon.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate()
    const loginPage = () => {
        navigate("/login")
    }

    return (
        <nav className="flex sticky top-0 z-50 items-center justify-between px-8 py-1.5 border-b border-white/10 bg-[#242424] text-white">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <img src={logo} alt="CommentMe Logo" className='rounded w-16 h-16 hover:cursor-pointer' />
                <span className="text-2xl font-medium tracking-tight">CommentMe</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-widest text-gray-300">
                <Link to="#" className="hover:text-white transition-colors uppercase">Skills</Link>
                <Link to="#" className="hover:text-white transition-colors uppercase">Integrations</Link>
                <Link to="#" className="hover:text-white transition-colors uppercase">About Us</Link>
                <Link to="#" className="hover:text-white transition-colors uppercase">Pricing</Link>
            </div>

            {/* Mobile Menu Button - Visible only on mobile */}
            <div className="lg:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-white focus:outline-none p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* CTA Button - Hidden on mobile to save space, or keep it if preferred. Let's hide it and put it in menu */}
            <div className="hidden lg:block">
                <button className="bg-[#EDE8D8] text-[#242424] px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer" onClick={loginPage}>
                    {isLogin ? "Dashboard" : "Get Started"}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-[#242424] border-b border-white/10 z-50 flex flex-col items-center py-6 gap-6 lg:hidden">
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Skills</Link>
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Integrations</Link>
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                    <button className="bg-[#EDE8D8] text-[#242424] px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer w-3/4" onClick={loginPage}>
                        {isLogin ? "Dashboard" : "Get Started"}
                    </button>
                </div>
            )}

            {/* Helper style for mobile links */}
            <style>{`
                .nav-link-mobile {
                    text-transform: uppercase;
                    font-size: 13px;
                    letter-spacing: 0.1em;
                    color: white;
                    font-weight: 500;
                }
            `}</style>
        </nav>
    )
}

export default Navbar