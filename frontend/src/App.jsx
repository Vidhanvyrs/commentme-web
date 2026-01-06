import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import './App.css'
import Footer from './components/Footer'

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`min-h-screen border-r border-l border-white/10 bg-[#242424] ${isHomePage ? 'homepage-frame' : ''}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
