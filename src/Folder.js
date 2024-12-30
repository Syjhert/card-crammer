import { useState } from 'react';
import Flashcard from './Flashcard';
import FlashcardForm from './FlashcardForm';

const Folder = ({ folder, toggleAnswer, addFlashcardToFolder }) => {
  const [flashcardInd, setFlashcardInd] = useState(0);

  const canPrev = ()=>{
    return flashcardInd > 0;
  }
  const canNext = ()=>{
    return flashcardInd < (folder.flashcards.length - 1)
  }

  const handlePrev = ()=>{
    setFlashcardInd(flashcardInd-1);
  }
  const handleNext = ()=>{
    setFlashcardInd(flashcardInd+1);
  }
  
  const prevButton = ()=>{
    if (canPrev()){
      return <button className="active-btn prev" onClick={handlePrev}>Prev</button>
    }
    else{
      return <button className="prev" disabled>Prev</button>
    }
  }

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
      <p>{flashcardInd+1} / {folder.flashcards.length}</p>
      <Flashcard key={flashcardInd} folderID={folder.id} flashcard={folder.flashcards[flashcardInd]} toggleAnswer={toggleAnswer} />
      <div className="folder-buttons">
        { prevButton() }
        { nextButton() }
      </div>
      <FlashcardForm folderID={folder.id} addFlashcardToFolder={addFlashcardToFolder} />
    </div>
  );
}

export default Folder;