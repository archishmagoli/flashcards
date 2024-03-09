import './App.css'
import { useState } from 'react';

const Flashcard = () => {      
    const questions = [
        {
            question: "Who was the first President of the United States?",
            answer: "George Washington",
            category: "History"
        },
        {
            question: "What year did the Berlin Wall fall?",
            answer: "1989",
            category: "History"
        },
        {
            question: "What is the chemical symbol for water?",
            answer: "H2O",
            category: "Science"
        },
        {
            question: "What is the largest planet in our solar system?",
            answer: "Jupiter",
            category: "Science"
        },
        {
            question: "What is the capital city of Australia?",
            answer: "Canberra",
            category: "Geography"
        },
        {
            question: "Which river is the longest in the world?",
            answer: "Nile",
            category: "Geography"
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            answer: "Harper Lee",
            category: "Literature"
        },
        {
            question: "In which sport would you perform a slam dunk?",
            answer: "Basketball",
            category: "Sports"
        },
        {
            question: "Who played the role of Harry Potter in the film series based on the books by J.K. Rowling?",
            answer: "Daniel Radcliffe",
            category: "Entertainment"
        },
        {
            question: "What is the highest-grossing film of all time (as of 2024)?",
            answer: "Avatar (although Avengers: Endgame is a close second!)",
            category: "Entertainment"
        }
    ];

    const [flipped, setIsFlipped] = useState(false);
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(questions[index].question);
    
    const handleClick = () => {
        setIsFlipped(!flipped);
        setText(text === questions[index].question ? questions[index].answer : questions[index].question);
    }

    const setColor = () => {
        switch (questions[index].category) {
            case "History":
                return "#FF6F61"; // Light red
            case "Science":
                return "#6FB1FF"; // Light blue
            case "Geography":
                return "#66C7B1"; // Greenish turquoise
            case "Literature":
                return "#FFD166"; // Light orange
            case "Sports":
                return "#45CE30"; // Lime green
            case "Entertainment":
                return "#FF9A3C"; // Coral
            default:
                return "#FFFFFF"; // Default color (white) if category not found
        }
    }

    const nextQuestion = () => {
        setIndex(prevIndex => {
            const newIndex = prevIndex == questions.length - 1 ? 0 : prevIndex + 1;
            setText(questions[newIndex].question); // Concurrently re-rendering the component

            return newIndex;
        });
    }

    const previousQuestion = () => {
        setIndex(prevIndex => {
            const newIndex = prevIndex == 0 ? questions.length - 1 : prevIndex - 1;
            setText(questions[newIndex].question); // Concurrently re-rendering the component

            return newIndex;
        });
    }
      
    return (
        <>
        <p>Total cards: <b>{questions.length}</b></p>
            <div className='container'>
                <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
                    <div className="flip-card-inner" style={{backgroundColor: setColor()}}>
                        <div className={`flip-card${flipped ? '-back' : '-front'}`}>
                            {text}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <button className='button' onClick={previousQuestion}>Previous</button>
            <button className='button' onClick={nextQuestion}>Next</button>
        </>
    )
}

export default Flashcard;