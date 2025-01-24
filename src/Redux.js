import { createStore } from 'redux';

// ACTION
const addNewFolder = (name)=>{
    return {
        type: "ADD-FOLDER",
        payload: {  name }
    };
}
const editFolder = (id, name, flashcards)=>{
    return {
        type: "EDIT-FOLDER",
        payload: { id, name, flashcards }
    };
}
const addFlashcard = (folderID, question, answer)=>{
    return {
        type: "ADD-FLASHCARD",
        payload: { folderID, question, answer }
    }
}

// REDUCER
const folders = (folders = [], action)=>{
    switch(action.type){
        case 'ADD-FOLDER':
            return folders.push(action.payload)
    }
}

// STORE or GLOBALIZED STATE
let store = createStore(folders);

store.subscribe(() => console.log(store.getState()));

store.dispatch(addNewFolder('New Folder'));