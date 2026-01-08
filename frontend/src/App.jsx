import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import './App.css'
import Footer from './components/Footer'
import api from './services/api'
import DashBoardPage from './pages/DashBoardPage'

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Silent refresh on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        await api.refresh();
        console.log('Session restored from refresh token');
      } catch (error) {
        console.log('No valid session found');
      }
    };
    initAuth();
  }, []);

  return (
    <div className={`min-h-screen border-r border-l border-white/10 bg-[#242424] ${isHomePage ? 'homepage-frame' : ''}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
