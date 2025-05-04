import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editFolder, toggleAnswer } from '../redux/folderSlice';
import FlashcardForm from '../Flashcard/FlashcardForm';

const EditFolder = () => {
  // Get the folder id from the URL params "folders/edit/:id"
  const { id } = useParams();

  // fetch all states
  const { folders, isLoading, error } = useSelector((state) => state.data);
  const dispatch = useDispatch(); // redux function
  const navigate = useNavigate(); // router function

  // State for the form inputs
  const [folderName, setFolderName] = useState('');
  const [flashcards, setFlashcards] = useState([]);

  // Find the folder to edit based on the id
  const folderToEdit = folders.find((folder) => folder._id === id);

  // If there is a folder to edit, set its fields to the states here
  useEffect(() => {
    if (folderToEdit) {
      setFolderName(folderToEdit.name);
      setFlashcards(folderToEdit.flashcards);
    }
  }, [folderToEdit]);
  
  // If no folder is found with the given id, return message to content body
  if (!folderToEdit) {
    return <div>Folder not found</div>;
  }

  // Handle form submission to edit the folder
  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName.trim() === '') {
      return; // Handle blank folder name
    }
    const updatedFolder = {
      _id: folderToEdit._id,
      name: folderName,
      flashcards: flashcards,
    };
    dispatch(editFolder(updatedFolder)); // Dispatch the edit action
    navigate('/folders/view/' + folderToEdit._id);  // Navigate to view the newly made folder
  };

  // if question textarea is changed, update the state of flashcards (automatic update)
  const handleQuestionChange = (index, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index] = { ...updatedFlashcards[index], question: value };
    setFlashcards(updatedFlashcards);
  };
  // if answer textarea is changed, update the state of flashcards (automatic update)
  const handleAnswerChange = (index, value) => {
    const updatedFlashcards = [...flashcards];
    updatedFlashcards[index] = { ...updatedFlashcards[index], answer: value };
    setFlashcards(updatedFlashcards);
  };

  // Add a new flashcard
  const addFlashcardToFolder = (question, answer) => {
    const newFlashcard = { id: Date.now(), question: question, answer: answer, showAnswer: false };
    // in case the array is not initiated as array yet
    if (!Array.isArray(flashcards)){
        setFlashcards([newFlashcard]);
    }
    else{
        setFlashcards([...flashcards, newFlashcard]);
    }
  };

  // Remove a flashcard
  const removeFlashcard = (index) => {
    // when filtering, used only the index when looping to find flashcard to delete
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);
  };

  // Loading or error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center gap-5 my-5 min-w-200">
      <div>
        <p className="text-2xl font-bold px-2">Edit Folder</p>
        <hr className="w-full border-placeholder mt-2"></hr>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
        <div className="flex flex-col items-center">
          <input
              type="text"
              value={folderName}
              className='text-center border focus:border-secondary dark:focus:border-secondary-dark rounded p-1'
              onChange={(e) => setFolderName(e.target.value)}
              required
          />
          <label htmlFor="folderName" className=" text-sm">Name</label>
        </div>
        <p className="text-xl mt-5">Flashcards</p>
        {(flashcards.length === 0 || !Array.isArray(flashcards)) ? (
        <p>No flashcards are in this folder yet.</p>
        ) : (
          <div className="flex flex-col items-center gap-2.5">
            {flashcards.map((flashcard, index) => (
              <div className="flex flex-col items-center">
                <div key={flashcard.id} className="flex p-2 gap-5">
                  <div className="flex flex-col items-center">
                    <label htmlFor={"flashcardQuestion" + flashcard.id}>Question</label>
                    <textarea
                      type="text"
                      id={"flashcardQuestion" + flashcard.id}
                      className='h-[50px] w-[400px] p-[5px] border border-gray-400 rounded resize-none'
                      placeholder="Enter question"
                      value={flashcard.question}
                      onChange={(e) => handleQuestionChange(index, e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label htmlFor={"flashcardAnswer" + flashcard.id}>Answer</label>
                    <textarea
                      type="text"
                      className='h-[50px] w-[400px] p-[5px] border border-gray-400 rounded resize-none'
                      id={"flashcardAnswer" + flashcard.id}
                      placeholder="Enter answer"
                      value={flashcard.answer}
                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                  </div>
                </div>
                <button className='h-7 w-40 border border-placeholder rounded cursor-pointer' 
                      type="button" onClick={() => removeFlashcard(index)}>Remove Flashcard</button>
              </div>
            ))}
          </div>
          )}
        </form>
        <FlashcardForm 
            addFlashcardToFolder={(question, answer) => {addFlashcardToFolder(question, answer)}}
        />
        <div className='flex justify-center gap-2.5'>
            <button className='h-10 px-3 border border-gray-400 rounded cursor-pointer' 
              onClick={ ()=>{navigate('/folders/view/' + folderToEdit._id)} }>Cancel</button>
            <button className='h-10 px-3 border border-gray-400 rounded cursor-pointer' 
              type="submit" form="editFolderForm">Save Changes</button>
        </div>
    </div>
  );
};

export default EditFolder;