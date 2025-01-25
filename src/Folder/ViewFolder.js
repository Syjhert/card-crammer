import { useState } from 'react';
import Flashcard from '../Flashcard/Flashcard';
import FlashcardForm from '../Flashcard/FlashcardForm';

const ViewFolder = ({ folder, toggleAnswer, addFlashcardToFolder }) => {
  // variable for the current index of flashcard in a folder within the array (not its ID)
  const [flashcardInd, setFlashcardInd] = useState(0);

  // boolean function to check if we can go to the previous card
  const canPrev = ()=>{
    return flashcardInd > 0;
  }
  // boolean function to check if we can go to the next card
  const canNext = ()=>{
    return flashcardInd < (folder.flashcards.length - 1)
  }
  // calls setFlashcardInd for an index decrement
  const handlePrev = ()=>{
    setFlashcardInd(flashcardInd-1);
  }
  // calls setFlashcardInd for an index increment
  const handleNext = ()=>{
    setFlashcardInd(flashcardInd+1);
  }

  // function that returns JXS button based on whether we can go back or not (if not it is disabled)
  const prevButton = ()=>{
    if (canPrev()){
      return <button className="active-btn prev" onClick={handlePrev}>Prev</button>
    }
    else{
      return <button className="prev" disabled>Prev</button>
    }
  }

  // function that returns JXS button based on whether we can go next or not (if not it is disabled)
  const nextButton = ()=>{
    if (canNext()){
      return <button className="active-btn next" onClick={handleNext}>Next</button>
    }
    else{
      return <button className="next" disabled>Next</button>
    }
  }

  return (
    <div className="folder">
      <h1>{ folder.name }</h1>
      { folder.flashcards.length > 0 && 
        <div>
          <p>{flashcardInd+1} / {folder.flashcards.length}</p>
          <Flashcard key={flashcardInd} folderID={folder.id} flashcard={folder.flashcards[flashcardInd]} toggleAnswer={toggleAnswer} />
          <div className="folder-buttons">
            { prevButton() }
            { nextButton() }
          </div>
        </div>
      }
      <FlashcardForm folderID={folder.id} addFlashcardToFolder={addFlashcardToFolder} />
    </div>
  );
}

export default ViewFolder;