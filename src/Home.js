import { useState, useEffect } from 'react';
import Folder from './Folder';
import FolderForm from './FolderForm';
import FolderPreview from './FolderPreview';

const Home = () => {

    // boolean for the home page to either show the folder previews or a folder content (its flashcards)
    const [showingFolder, setShowingFolder] = useState(false);
    // if we view the folder contents, this variable stores the ID of that folder
    const [folderID, setFolderID] = useState(0);
    // folders holder, default state contains dummy data
    // Not json because this does not have database yet so cannot save, edit, and delete contents
    const [folders, setFolders] = useState([
        {
            id: 1,
            name: 'Basic Math',
            flashcards: [
                { id: 1, question: "What is 5 + 3?", answer: "8", showAnswer: false },
                { id: 2, question: "What is 20 ÷ 4?", answer: "5", showAnswer: false },
                { id: 3, question: "What is the square root of 16?", answer: "4", showAnswer: false },
                { id: 4, question: "What is 25 + 25?", answer: "50", showAnswer: false },
                { id: 5, question: "What is 22 * 12?", answer: "264", showAnswer: false },
                { id: 6, question: "What is the value of pi up to two decimal places?", answer: "3.14", showAnswer: false },
            ],
        },
        {
            id: 2,
            name: 'Science',
            flashcards: [
                { id: 1, question: "Which scientist proposed the theory of general relativity?", answer: "Albert Einstein", showAnswer: false },
                { id: 2, question: "What is the name of the process by which plants convert light into chemical energy?", answer: "Photosynthesis", showAnswer: false },
                { id: 3, question: "Which subatomic particle has no electric charge?", answer: "Neutron", showAnswer: false },
                { id: 4, question: "What is the unit of electrical resistance?", answer: "Ohm", showAnswer: false },
                { id: 5, question: "Which element is found in all organic compounds?", answer: "Carbon", showAnswer: false },
                { id: 6, question: "Which of these planets is known for its Great Red Spot?", answer: "Jupiter", showAnswer: false },
            ],
            },
    ]);

    // add new folder in the "folders" using react hook (useState)
    const addFolder = (folderName) => {
        setFolders((prevFolders)=> [
            //expands existing "folders" variable into individuals 
            ...prevFolders,
            // then adds a new folder object
            {id: prevFolders.length + 1, name: folderName, flashcards: []}
        ])
        console.log(folders);
    }

    // adds new flashcard to an existing folder using react hook
    const addFlashcardToFolder = (folderID, newFlashcard) => {
        setFolders((prevFolders) =>
        prevFolders.map((folder) =>{
            // if this is the folder we are finding, we change the object returned
            if (folder.id === folderID) {
                // returns a new object with all the "folder" properties
                return {  ...folder,
                    // updates the "flashcards" property with a new array
                    flashcards: 
                    [
                        // retains the previous flashcards
                        ...folder.flashcards, 
                        // adds a new flashcard with the latest ID, question, and answer properties
                        { id: folder.flashcards.length+1, question: newFlashcard.question, answer: newFlashcard.answer }
                    ] 
                };
            }
            // else retain the folder contents
            else{
                return folder;
            }
        })
        );
    };

    // given a folderID and flashcardID, toggle the flashcard's "showAnswer" property using setFolders
    const toggleAnswer = (folderID, flashcardID) => {
        setFolders((prevFolders) => 
            prevFolders.map((folder) => {
                // if this is the correct folder, we return a new object
                if (folder.id === folderID){
                    // updated flashcards variable that maps the flashcards of the current folder
                    // if this is the correct flashcard, make a new object with previous properties 
                    // except the showAnswer is reverese. ELSE retain the other card contents
                    const updatedFlashcards = folder.flashcards.map((card) => 
                        card.id === flashcardID ? { ...card, showAnswer: !card.showAnswer } : card
                    );
                    // update the flashcards of this folder
                    return { ...folder, flashcards: updatedFlashcards };
                }
                // else retain the other folder contents
                else{
                    return folder;
                }
            })
        );
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