import { useState } from 'react';
import Flashcard from '../Flashcard/Flashcard';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAnswer } from '../redux/folderSlice';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import editPNG from "../assets/edit.png"
import editPNGDark from "../assets/edit-dark.png"

const ViewFolder = () => {
  // gets the id in the route to this Component "/folders/:id"
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.ui.theme);

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
    return (
      <button
        className={`h-10 w-15 border rounded active-btn prev 
        bg-section dark:bg-section-dark 
        ${!canPrev() ? 'bg-placeholder cursor-not-allowed' : 
          'border-3 font-semibold cursor-pointer hover:text-primary dark:hover:text-primary-dark hover:border-primary dark:hover:border-primary-dark'
        }`}
        onClick={canPrev() ? handlePrev : null}
        disabled={!canPrev()}
      >
        Prev
      </button>
    );
  }

  // function that returns JXS button based on whether we can go next or not (if not it is disabled)
  const nextButton = ()=>{
    return (
      <button
        className={`h-10 w-15 border rounded active-btn next 
          bg-section dark:bg-section-dark
          ${!canNext() ? 'bg-placeholder cursor-not-allowed' : 
            'border-3 font-semibold cursor-pointer hover:text-primary dark:hover:text-primary-dark hover:border-primary dark:hover:border-primary-dark'}`}
        onClick={canNext() ? handleNext : null}
        disabled={!canNext()}
      >
        Next
      </button>
    );
  }

  return (
    <div className="mt-5">
      <div className='flex justify-center items-center gap-2.5'>
        <p className='text-2xl font-bold'>{ folderToView.name }</p>
        <img className='w-4 h-4 cursor-pointer' onClick={()=>{ navigate('/folders/edit/' + folderToView._id) }} 
          src={theme == "light" ? editPNG : editPNGDark}></img>
      </div>
      { folderToView.flashcards.length > 0 ?
        <div className='flex flex-col items-center mt-2 gap-2'>
          <p>{flashcardInd+1} / {folderToView.flashcards.length}</p>
          <Flashcard key={flashcardInd} flashcard={folderToView.flashcards[flashcardInd]} handleToggleAnswer={handleToggleAnswer} />
          <div className="flex justify-center gap-2.5 mb-2.5">
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