import { useState, useEffect, use } from 'react';
import Folder from './Folder/ViewFolder';
import CreateFolder from './Folder/CreateFolder';
import FolderPreview from './Folder/FolderPreview';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFolders ,addNewFolder, editFolder, addFlashcard, toggleAnswer } from './redux/actions';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const Home = () => {

    // boolean for the home page to either show the folder previews or a folder content (its flashcards)
    const [showingFolder, setShowingFolder] = useState(false);
    // boolean for the home page to show the folder creation page
    const [creatingFolder, setCreatingFolder] = useState(false);
    // if we view the folder contents, this variable stores the ID of that folder
    const [folderID, setFolderID] = useState(0);

    const dispatch = useDispatch();
    const { data, isLoading, error } = useSelector((state) => state.folders);

    useEffect(() => {
        dispatch(fetchFolders());
    }, [dispatch])
    console.log(data);
    console.log(isLoading);
    console.log(error);

    const navigate = useNavigate();  // used for programmatic navigation

    const handleCreateFolder = () => {
        setCreatingFolder(true);
        navigate("/create-folder");  // navigate to the 'create-folder' route
    };

    const handleViewFolder = () => {
        setShowingFolder(true);
        navigate("/view-folder");  // navigate to the 'view-folder' route
    };

    // add new folder in the "folders" using react hook (useState)
    const addFolder = (folderName) => {
        dispatch(addNewFolder(folderName));
        console.log(data);
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
            <Routes>
                {/* Nested Routes */}
                <Route path="/" element={
                    <div>
                        <button onClick={() => handleCreateFolder()}>Create Folder</button>
                        <div className="folder-preview-cont">
                            {data.map((folder) => (
                                <FolderPreview 
                                    key={folder.id}
                                    folder={folder}
                                    setShowingFolder={setShowingFolder}
                                    setFolderID={setFolderID}
                                />
                            ))}
                        </div>
                    </div>
                    
                } />
                <Route path="create-folder" element={ <CreateFolder/> } />
                <Route path="view-folder" element={ 
                    <Folder 
                    folder={data.find(folder => folder.id == folderID)}
                    toggleAnswer={toggleAnswer}
                    addFlashcardToFolder={addFlashcardToFolder}
                    /> } />
            </Routes>

            {/* { !showingFolder && 
                <div>
                    <div className="folder-preview-cont">
                        {data.map((folder) => (
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
                    folder={data.find(folder => folder.id == folderID)}
                    toggleAnswer={toggleAnswer}
                    addFlashcardToFolder={addFlashcardToFolder}
                />
            } */}
        </div>
    );
}
 
export default Home;