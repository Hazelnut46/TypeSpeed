import { useState, useEffect } from 'react'

function LeaderboardPage() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/scores/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        setScores(data)
        setLoading(false)
      })
      .catch((err) => {
        console.log('Failed to load leaderboard', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="leaderboard-page"><p>Loading...</p></div>
  }

  return (
    <div className="leaderboard-page">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>WPM</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.user?.username || 'Unknown'}</td>
              <td>{score.wpm}</td>
              <td>{score.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardPage