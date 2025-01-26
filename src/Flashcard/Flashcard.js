import React from 'react';

const Flashcard = ({ flashcard, handleToggleAnswer }) => {
  return (
    <div className="flashcard">
      <h3>{flashcard.question}</h3>
      {flashcard.showAnswer && <p>{flashcard.answer}</p>}
      <button className="toggle-answer-button" onClick={() => handleToggleAnswer()}>
        {flashcard.showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
    </div>
  );
} 

export default Flashcard;