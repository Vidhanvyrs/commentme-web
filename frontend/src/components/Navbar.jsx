import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/bicon.png'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="flex sticky top-0 z-50 items-center justify-between px-8 py-1.5 border-b border-white/10 bg-[#242424] text-white">
            {/* Logo Section */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <img src={logo} alt="CommentMe Logo" className='rounded w-16 h-16' />
                <span className="text-2xl font-medium tracking-tight">CommentMe</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-widest text-gray-300">
                <Link to="#" className="hover:text-white transition-colors uppercase">Skills</Link>
                <Link to="#" className="hover:text-white transition-colors uppercase">Integrations</Link>
                <Link to="/docs" className="hover:text-white transition-colors uppercase">Docs</Link>
                <Link to="#" className="hover:text-white transition-colors uppercase">Pricing</Link>
                {user && <Link to="/dashboard" className="hover:text-white transition-colors uppercase text-blue-400">Dashboard</Link>}
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

            {/* CTA Button */}
            <div className="hidden lg:block">
                <button
                    className="bg-[#EDE8D8] text-[#242424] px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer"
                    onClick={user ? handleLogout : () => navigate('/login')}
                >
                    {user ? "Logout" : "Get Started"}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-[#242424] border-b border-white/10 z-50 flex flex-col items-center py-6 gap-6 lg:hidden">
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Skills</Link>
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Integrations</Link>
                    <Link to="/docs" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Docs</Link>
                    <Link to="#" className="nav-link-mobile" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                    {user && (
                        <Link to="/dashboard" className="nav-link-mobile text-blue-400" onClick={() => setIsMenuOpen(false)}>
                            Dashboard
                        </Link>
                    )}
                    <button
                        className="bg-[#EDE8D8] text-[#242424] px-5 py-2.5 text-[11px] font-bold tracking-wider uppercase hover:bg-white transition-colors cursor-pointer w-3/4"
                        onClick={user ? () => { setIsMenuOpen(false); handleLogout(); } : () => { setIsMenuOpen(false); navigate('/login'); }}
                    >
                        {user ? "Logout" : "Get Started"}
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