import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editFolder } from '../redux/reducer';
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
  const folderToEdit = folders.find((folder) => folder.folderID === parseInt(id));

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
      folderID: folderToEdit.folderID,
      name: folderName,
      flashcards: flashcards,
    };
    dispatch(editFolder(updatedFolder)); // Dispatch the edit action
    navigate('/folders/view/' + folderToEdit.folderID);  // Navigate to view the newly made folder
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
    <div className="edit-folder">
      <h2>Edit Folder</h2>
      <form onSubmit={handleSubmit} id="editFolderForm">
        <div className="form-group">
        <label htmlFor="folderName">Folder Name: </label>
        <input
            type="text"
            id="folderName"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
        />
        </div>
        <h2>Flashcards</h2>
        {(flashcards.length === 0 || !Array.isArray(flashcards)) ? (
        <p>No flashcards are in this folder yet.</p>
        ) : (
            flashcards.map((flashcard, index) => (
                <div key={flashcard.id} className="flashcard">
                  <label htmlFor={"flashcardQuestion" + flashcard.id}>Question</label>
                  <textarea
                    type="text"
                    id={"flashcardQuestion" + flashcard.id}
                    placeholder="Enter question"
                    value={flashcard.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                  />
                  <label htmlFor={"flashcardAnswer" + flashcard.id}>Answer</label>
                  <textarea
                    type="text"
                    id={"flashcardAnswer" + flashcard.id}
                    placeholder="Enter answer"
                    value={flashcard.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                <button type="button" onClick={() => removeFlashcard(index)}>Remove Flashcard</button>
                </div>
            ))
            )}
        </form>
        <FlashcardForm 
            addFlashcardToFolder={(question, answer) => {addFlashcardToFolder(question, answer)}}
        />
        <div className='edit-folder-form-buttons'>
            <button onClick={ ()=>{navigate('/folders/view/' + folderToEdit.folderID)} }>Cancel</button>
            <button type="submit" form="editFolderForm">Save Changes</button>
        </div>
    </div>
  );
};

export default EditFolder;