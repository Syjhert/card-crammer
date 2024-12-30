import { useState, useEffect } from 'react';
import Folder from './Folder';
import FolderForm from './FolderForm';
import FolderPreview from './FolderPreview';

const Home = () => {
    const [showingFolder, setShowingFolder] = useState(false);
    const [folderID, setFolderID] = useState(0);
    // Not json because this does not have database yet
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

    const addFolder = ({folderName}) => {
        setFolders((prevFolders)=> [
        ...prevFolders,
        {id: prevFolders.length + 1, name: folderName, flashcards: []}
        ])
    }

    const addFlashcardToFolder = (folderID, newFlashcard) => {
        setFolders((prevFolders) =>
        prevFolders.map((folder) =>{
            if (folder.id === folderID) {
            return {  ...folder, 
                flashcards: 
                [
                    ...folder.flashcards, 
                    { id: folder.flashcards.length+1, question: newFlashcard.question, answer: newFlashcard.answer }
                ] 
            };
            }
            else{
            return folder;
            }
        })
        );
    };

    const toggleAnswer = (folderID, flashcardID) => {
        setFolders((prevFolders) => 
            prevFolders.map((folder) => {
                if (folder.id === folderID){
                    const updatedFlashcards = folder.flashcards.map((card) => 
                        card.id === flashcardID ? { ...card, showAnswer: !card.showAnswer } : card
                    );
                    return { ...folder, flashcards: updatedFlashcards };
                }
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