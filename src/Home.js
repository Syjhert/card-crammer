import { useState, useEffect } from 'react';
import Folder from './Folder/Folder';
import FolderForm from './Folder/FolderForm';
import FolderPreview from './Folder/FolderPreview';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData ,addNewFolder, editFolder, addFlashcard, toggleAnswer } from './redux/actions';

const Home = async () => {

    // boolean for the home page to either show the folder previews or a folder content (its flashcards)
    const [showingFolder, setShowingFolder] = useState(false);
    // if we view the folder contents, this variable stores the ID of that folder
    const [folderID, setFolderID] = useState(0);

    const folders = useSelector((state) => state.folders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    console.log(folders);

    // add new folder in the "folders" using react hook (useState)
    const addFolder = (folderName) => {
        dispatch(addNewFolder(folderName));
        console.log(folders);
    }

    // adds new flashcard to an existing folder using react hook
    const addFlashcardToFolder = (folderID, newFlashcard) => {
        dispatch(addFlashcard(folderID, newFlashcard));
    };

    // given a folderID and flashcardID, toggle the flashcard's "showAnswer" property using setFolders
    const toggleAnswer = (folderID, flashcardID) => {
        dispatch(toggleAnswer(folderID, flashcardID));
    };

    return (    
        <div className="home">
            { !showingFolder && 
                <div>
                    <FolderForm addFolder={addFolder} />
                    <div className="folder-preview-cont">
                        {folders.map((folder) => (
                            <FolderPreview 
                                key={folder.id}
                                folder={folder}
                                setShowingFolder={setShowingFolder}
                                setFolderID={setFolderID}
                            />
                        ))}
                    </div>
                </div>
            }
            { showingFolder &&
                <Folder 
                    key={folderID} 
                    folder={folders.find(folder => folder.id == folderID)} 
                    toggleAnswer={toggleAnswer} 
                    addFlashcardToFolder={addFlashcardToFolder}
                />
            }
        </div>
    );
}
 
export default Home;