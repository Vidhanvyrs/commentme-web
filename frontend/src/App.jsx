import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import './App.css'
import Footer from './components/Footer'
import api from './services/api'
import DashBoardPage from './pages/DashBoardPage'
import DocsPage from './pages/DocsPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AuthProvider>
      <div className={`min-h-screen border-r border-l border-white/10 bg-[#242424] ${isHomePage ? 'homepage-frame' : ''}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
