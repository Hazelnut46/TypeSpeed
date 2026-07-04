import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TypePage from './pages/TypePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LeaderboardPage from './pages/LeaderboardPage'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TypePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App