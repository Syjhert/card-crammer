import React from 'react';

const Flashcard = ({ flashcard, handleToggleAnswer }) => {
  return (
    <div className="border-3 min-w-2xl mx-auto my-3 p-7 rounded-lg flex flex-col items-center gap-2.5">
      <p className='text-xl font-bold'>{flashcard.question}</p>
      {flashcard.showAnswer && <div className='w-full flex flex-col items-center gap-5'>
          <hr className='w-full border-placeholder'></hr>
          <p>{flashcard.answer}</p>
        </div>
      }
      <button className="border border-placeholder text-sm hover:bg-secondary dark:hover:bg-secondary-dark 
        hover:text-text-dark dark:hover:text-text mt-3 px-2 py-2 rounded cursor-pointer" onClick={() => handleToggleAnswer()}>
        {flashcard.showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
    </div>
  );
} 

export default Flashcard;