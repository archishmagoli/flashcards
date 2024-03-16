import './App.css'
import { useState } from 'react';
import Fuse from 'fuse.js';

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
            answer: "Avatar (Avengers: Endgame is a close close and is also accepted!)",
            category: "Entertainment"
        }
    ];

    const [flipped, setIsFlipped] = useState(false);
    const [index, setIndex] = useState(0);
    const [allQuestions, setAllQuestions] = useState(questions);
    const [text, setText] = useState(allQuestions[index].question);
    const [guess, setGuess] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    
    const handleClick = (e) => {
        e.preventDefault();
        setIsFlipped(!flipped);
        setText(text === allQuestions[index].question ? 
            allQuestions[index].answer : allQuestions[index].question);
    };

    const setColor = (category) => {
        switch (category) {
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
    };    

    const nextQuestion = (e) => {
        e.preventDefault();
        setIndex(prevIndex => {
            const newIndex = prevIndex == allQuestions.length - 1 ? 0 : prevIndex + 1;
            setText(allQuestions[newIndex].question); // Concurrently re-rendering the component
            setGuess(''); // Also concurrently re-setting the guess
            setIsCorrect(null);
            setIsFlipped(false); // Also re-setting the flipped state!
            return newIndex;
        });
    };

    const previousQuestion = (e) => {
        e.preventDefault();
        setIndex(prevIndex => {
            const newIndex = prevIndex == 0 ? allQuestions.length - 1 : prevIndex - 1;
            setText(allQuestions[newIndex].question); // Concurrently re-rendering the component
            setGuess(''); // Also concurrently re-setting the guess
            setIsCorrect(null);
            setIsFlipped(false); // Also re-setting the flipped state!
            return newIndex;
        });
    };

    const performFuzzySearch = (inputText, answer) => {
        const fuse = new Fuse([answer], {
            threshold: 0.15, // Adjust this threshold as needed for better or looser matches
        });
        const result = fuse.search(inputText);
        return result.length > 0 ? result[0].item : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const matchedAnswer = performFuzzySearch(guess, allQuestions[index].answer);
        if (matchedAnswer) { // null returns false in a boolean check!
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    }

    const addGuess = (e) => {
        e.preventDefault();
        setGuess(e.target.value);
        if (e.target.value == '') {
            setIsCorrect(null); // Handling re-guessing
        }
    }

    const shuffle = () => {
        const shuffledQuestions = [...allQuestions]; // Create a copy of the array
        let currentIndex = shuffledQuestions.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [shuffledQuestions[currentIndex], shuffledQuestions[randomIndex]] = [
                shuffledQuestions[randomIndex], shuffledQuestions[currentIndex]
            ];
        }

        setAllQuestions(shuffledQuestions); // Update state with the shuffled array

        setIndex(prevIndex => {
            const newIndex = prevIndex === 0 ? prevIndex : 0;
            setText(shuffledQuestions[newIndex].question); // Concurrently re-rendering the component
            setGuess(''); // Also concurrently re-setting the guess
            setIsCorrect(null);
            setIsFlipped(false); // Also re-setting the flipped state!
            return newIndex;
        });
      }
      
    return (
        <>
        <p>Total cards: <b>{allQuestions.length}</b></p>
            <div className='container'>
                <div className={`card ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
                    <div className="flip-card-inner" style={{backgroundColor: setColor(allQuestions[index].category)}}>
                        <div className={`flip-card${flipped ? '-back' : '-front'}`}>
                            {text}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <form onSubmit = {handleSubmit}>
                <label htmlFor="guess">Enter your guess here:</label>
                <input type="text"
                id="guess"
                name="guess"
                value={guess}
                onChange={addGuess}
                disabled={flipped}
                className={guess.length === 0 ? 'input-default' : (isCorrect === null ? 'input-default' : (isCorrect ? 'input-correct' : 'input-incorrect'))}
                placeholder="Example guess.."/>

                <button type="submit" disabled={flipped} className='button'>Submit Guess</button>
            </form>
            {guess.length === 0 ? <h3></h3> : (isCorrect === null ? <h3></h3> : 
                (isCorrect ? <h3 className='rightAnswer'>You guessed correctly! The answer is: {allQuestions[index].answer}</h3> : 
                <h3 className='wrongAnswer'>Wrong answer! Try again.</h3>))}
            <button className='button' onClick={previousQuestion}>Previous</button>
            <button className='button' onClick={nextQuestion}>Next</button>
            <button className='button' onClick={shuffle}>Shuffle Cards</button>
            <br></br>
            <br></br>
        </>
    )
}

export default Flashcard;