import { useState } from 'react';
import Flashcard from '../Flashcard/Flashcard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAnswer } from '../redux/reducer';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import editPNG from "../assets/edit.png"


const ViewFolder = () => {
  // gets the id in the route to this Component "/folders/:id"
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // variable for the current index of flashcard in a folder within the array (not its ID)
  const [flashcardInd, setFlashcardInd] = useState(0);

  const { folders, isLoading, error } = useSelector((state) => state.data);
  if (isLoading) return <div>Loading Files...</div>;
  if (error) return <div>Error in loading files: {error}</div>;
  if (!folders || folders.length === 0) {
    return <div>There was a problem loading the folder</div>
  }

  const folderToView = folders.find(folder => folder._id === id);

   // If no folder is found with the given ID
   if (!folderToView) {
    return <div>Folder not found</div>;
  }
  // boolean function to check if we can go to the previous card
  const canPrev = ()=>{
    return flashcardInd > 0;
  }
  // boolean function to check if we can go to the next card
  const canNext = ()=>{
    return flashcardInd < (folderToView.flashcards.length - 1)
  }
  // calls setFlashcardInd for an index decrement
  const handlePrev = ()=>{
    setFlashcardInd(flashcardInd-1);
  }
  // calls setFlashcardInd for an index increment
  const handleNext = ()=>{
    setFlashcardInd(flashcardInd+1);
  }

  const handleToggleAnswer = () => {
    dispatch(toggleAnswer({
      folderID: folderToView._id, 
      flashcardID: folderToView.flashcards[flashcardInd]._id
    }));
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
      <div className='viewfolder-name'>
        <h1>{ folderToView.name }</h1>
        <img onClick={()=>{ navigate('/folders/edit/' + folderToView._id) }} src={editPNG}></img>
      </div>
      { folderToView.flashcards.length > 0 ?
        <div>
          <p>{flashcardInd+1} / {folderToView.flashcards.length}</p>
          <Flashcard key={flashcardInd} flashcard={folderToView.flashcards[flashcardInd]} handleToggleAnswer={handleToggleAnswer} />
          <div className="folder-buttons">
            { prevButton() }
            { nextButton() }
          </div>
        </div> : <div>No flashcards are in this folder yet.</div>
      }
      {/* <FlashcardForm folderID={folder.id} addFlashcardToFolder={addFlashcardToFolder} /> */}
    </div>
  );
}

export default ViewFolder;