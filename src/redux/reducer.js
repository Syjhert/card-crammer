export const foldersReducer = (folders = [], action)=>{
  let newFolders = [];
  switch(action.type){
    case 'FETCH_DATA_SUCCESS':
      console.log("I GOT THE DATA");
      console.log(action.payload);
      return action.payload.data;
    case 'FETCH_DATA_ERROR':
      return folders;
    case 'ADD-FOLDER':      
      newFolders = [...folders];
      const newFolder = {
        id: !folders ? 1 : folders.length + 1,
        name: action.payload.name
      }  
      newFolders.push(newFolder);
      return newFolders;
    case 'EDIT-FOLDER':
      folders.forEach((folder)=>{
        if (folder.id === action.payload.folderID){
          newFolders.push({...folder ,name: action.payload.name, flashcards: action.payload.flashcards})
        }
        else{
          newFolders.push(folder);
        }
      })
      return newFolders;
    case 'ADD-FLASHCARD':
      folders.forEach((folder)=>{
        if (folder.id === action.payload.folderID){
          const newFlashcard = { 
            id: folder.flashcards[folders.length - 1] + 1, 
            question: action.payload.question,
            answer: action.payload.answer,
            showAnswer: false  
          }
          newFolders.push({...folder, flashcards: [...folder.flashcards, newFlashcard]})
        }
        else{
          newFolders.push(folder);
        }
      })
      return newFolders;
    case 'TOGGLE-ANSWER':
      folders.forEach((folder) => {
        // if this is the correct folder, we return a new object
        if (folder.id === action.payload.folderID){
            // updated flashcards variable that maps the flashcards of the current folder
            // if this is the correct flashcard, make a new object with previous properties 
            // except the showAnswer is reverese. ELSE retain the other card contents
            const updatedFlashcards = folder.flashcards.map((card) => 
                card.id === action.payload.flashcardID ? { ...card, showAnswer: !card.showAnswer } : card
            );
            // update the flashcards of this folder
            newFolders.push({ ...folder, flashcards: updatedFlashcards });
        }
        // else retain the other folder contents
        else{
            newFolders.push(folder);
        }
      })
      return newFolders;
    default:
      console.log("I was defaulted");
      return folders;
    }
}