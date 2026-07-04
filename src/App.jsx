import {useState, useEffect} from 'react';
import './App.css';




const WORD_BANK = [
  'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog',
  'react', 'javascript', 'code', 'type', 'speed', 'test', 'keyboard',
  'practice', 'learn', 'build', 'project', 'resume'
]


function getRandomWords(count){
  const result = []
  for(let i=0; i<count; i++){
    const randomIndex = Math.floor(Math.random() * WORD_BANK.length)
    result.push(WORD_BANK[randomIndex])
  }
  return result
}


function calculateWPM(words, wordResults, totalSeconds){
  let totalChars = 0;
  for(let i=0; i<wordResults.length; i++){
    if(wordResults[i]){
      totalChars += words[i].length
    }
  }
  const minutes = totalSeconds / 60
  const wpm = Math.round((totalChars / 5) / minutes )
  return wpm
}

function countCorrectChars(typedWord, targetWord){
  let correct = 0;
  for(let i=0; i<typedWord.length; i++){
    if (typedWord[i] === targetWord[i]) {
      correct++;
    }
  }
  return correct
}

function App() {
  const [words, setWords] = useState(() => getRandomWords(20));
  const [TypedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordResults, setWordResults] = useState([]) // e.g. [true, false, true] = correct, wrong, correct
  const [hasStarted, sethasStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30)
  const [correctchars, setCorrectChars] = useState(0)
  const [totalCharsTyped, setTotalCharsTyped] = useState(0)


  useEffect(() => {
    if(words.length - currentWordIndex < 5){
      setWords([...words, ...getRandomWords(10)])
    }
  }, [words, currentWordIndex])


  useEffect(() => {
    if(!hasStarted) return

    if(timeLeft === 0) return

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timerId)
  }, [hasStarted, timeLeft])



  const handleChange = (e) => {
    if(!hasStarted) {
      sethasStarted(true);
    }
    const value = e.target.value
    if(value.endsWith(' ')) {
      const typeWord = value.trim()
      const isCorrect = typeWord === words[currentWordIndex]
      setWordResults([...wordResults, isCorrect]);

      const correct = countCorrectChars(typeWord, words[currentWordIndex])
      setCorrectChars(correctchars + correct)
      setTotalCharsTyped(totalCharsTyped + typeWord.length)

      setCurrentWordIndex(currentWordIndex + 1);
      setTypedText('');
    } else {
      setTypedText(value);
    }
  }

  const handleRestart = () => {
  setWords(getRandomWords(20));
  setTypedText('');
  setCurrentWordIndex(0);
  setWordResults([]);
  sethasStarted(false);
  setTimeLeft(30);
  setCorrectChars(0);
  setTotalCharsTyped(0);
}
  return (
    <div className="app">
      <h1>Type</h1>

      <div className="word-display">
        {words.map((word, index) => {
          let className = 'word';
          if(index < wordResults.length){
            className += wordResults[index] ? ' correct' : ' incorrect'
          } else if(index === currentWordIndex){
            className += ' current'
          }
          return (
            <span key={index} className={className}>
              {word}{' '}
            </span>
          )
        })}
      </div>

      <div className="input-row">
        <input
          type="text"
          value={TypedText}
          onChange={handleChange}
          placeholder="Start typing..."
          disabled={timeLeft === 0}
        />
        <div className="timer-box">{timeLeft}s</div>
      </div>

      {timeLeft === 0 && (
        <div className="results">
          <h2>Results</h2>
          <p>WPM: {calculateWPM(words, wordResults, 30)}</p>
          <p>Accuracy: {Math.round((correctchars / totalCharsTyped) * 100)}%</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  )
}


export default App;