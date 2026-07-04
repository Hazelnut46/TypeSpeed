import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Type</Link>
      <div className="navbar-links">
        <Link to="/">type</Link>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
        <Link to="/leaderboard">leaderboard</Link>
      </div>
    </nav>
  )
}

export default Navbar