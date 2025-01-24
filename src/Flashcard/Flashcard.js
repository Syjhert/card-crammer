import React from 'react';

const Flashcard = ({ folderID, flashcard, toggleAnswer }) => {
  return (
    <div className="flashcard">
      <h3>{flashcard.question}</h3>
      {flashcard.showAnswer && <p>{flashcard.answer}</p>}
      <button className="toggle-answer-button" onClick={() => toggleAnswer(folderID, flashcard.id)}>
        {flashcard.showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
    </div>
  );
} 

export default Flashcard;