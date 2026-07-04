# ⌨️ Type — Typing Speed Test
 
A full-stack typing speed test app with real-time WPM/accuracy tracking, user accounts, and a global leaderboard.
 
**Live demo:** 

https://github.com/user-attachments/assets/cc300d06-d369-407a-aa1e-f062c72b539a



 
---
 
## Features
 
- **Live typing test** — words stream continuously for 30 seconds, with real-time correct/incorrect highlighting
- **WPM & accuracy calculation** — character-level accuracy tracking, industry-standard WPM formula
- **User accounts** — sign up and log in with hashed passwords and JWT-based authentication
- **Score history** — completed tests are automatically saved to your account when logged in
- **Global leaderboard** — see the top scores across all users, pulled live from the database
---
 
 
## How It Works
 
1. Words are generated from a word bank and streamed continuously as you type, so the test never "runs out" mid-session
2. Each completed word is checked character-by-character against the target word to calculate accuracy
3. WPM is calculated using the standard formula: `(correct characters / 5) / minutes elapsed`
4. When the timer ends, if you're logged in, your score is automatically sent to the backend and saved
5. The leaderboard route fetches the top 10 scores, sorted by WPM, with usernames populated from the linked user account
---
 
