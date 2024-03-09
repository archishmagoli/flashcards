import { useState } from 'react'
import Flashcard from './Flashcard'
import './index.css'
import './App.css'

function App() {
  return (
    <>
    <div>
      <h1>General Knowledge Trivia</h1>
        <p><b>Become a more informed citizen by reviewing the general knowledge questions below!</b></p>

        <div className="color-key">
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#FF6F61'}}></div>
            <div className="color-label">History</div>
          </div>
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#6FB1FF'}}></div>
            <div className="color-label">Science</div>
          </div>
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#66C7B1'}}></div>
            <div className="color-label">Geography</div>
          </div>
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#FFD166'}}></div>
            <div className="color-label">Literature</div>
          </div>
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#45CE30'}}></div>
            <div className="color-label">Sports</div>
          </div>
          <div className="color-item">
            <div className="color-circle" style={{backgroundColor: '#FF9A3C'}}></div>
            <div className="color-label">Entertainment</div>
          </div>
        </div>
      <br></br>

      <Flashcard />
    </div>
      
    </>
  )
}

export default App
