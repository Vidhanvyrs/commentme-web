import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FileTreeDemo } from '@/components/FileTreeDemo';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                if (!formData.username || !formData.password) {
                    throw new Error("Please fill in all fields");
                }
                const result = await api.login(formData.username, formData.password);
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.userId);
                navigate('/');
            } else {
                if (!formData.username || !formData.email || !formData.password) {
                    throw new Error("Please fill in all fields");
                }
                await api.signup(formData.username, formData.email, formData.password);
                // Auto login after signup or ask user to login? 
                // For now, let's switch to login mode and show success
                setIsLogin(true);
                setError('Account created successfully! Please log in.'); // Using error state for message for now, ideally separate
                setFormData({ username: '', email: '', password: '' });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#242424] text-white">
            {/* Left Side - Image & Overlay */}
            <div className="hidden lg:flex mb-2 w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                    alt="Abstract Art"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 flex flex-col justify-between p-12 h-full">
                    <div className="flex items-center gap-2">
                        {/* Placeholder for logo if needed, or simple text */}
                        <div className="flex-row items-center gap-2">
                            <div className="text-xl font-bold tracking-tighter">CommentMe-CLI</div>
                            <FileTreeDemo />
                        </div>

                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-gray-400">
                            {isLogin
                                ? 'Enter your credentials to access your account'
                                : 'Enter your email below to create your account'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login-inputs' : 'signup-inputs'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-gray-400">
                                            <User size={18} />
                                        </div>
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="johndoe"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-transparent px-10 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-2.5 text-gray-400">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="flex h-10 w-full rounded-md border border-white/10 bg-transparent px-10 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-gray-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="flex h-10 w-full rounded-md border border-white/10 bg-transparent px-10 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {error && (
                            <div className={`text-sm ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-10 px-4 py-2 w-full"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#242424] px-2 text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-sm">
                        <span className="text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </span>
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setFormData({ username: '', email: '', password: '' });
                            }}
                            className="text-white hover:underline underline-offset-4"
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>

                    <p className="px-8 text-center text-sm text-gray-400">
                        By clicking continue, you agree to our{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-white">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="underline underline-offset-4 hover:text-white">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
