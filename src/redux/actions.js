export const addNewFolder = (name)=>{
    return {
        type: "ADD-FOLDER",
        payload: name
    };  
}

export const fetchData = () => { 
    return async (dispatch) => {
        const url = 'https://quizmania-api.p.rapidapi.com/trivia-by-category?category=Geography';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bb3c5d553fmsh18113e5f694a128p136cf0jsna9d21b7369d1',
                'x-rapidapi-host': 'quizmania-api.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            dispatch({ 
                type: 'FETCH_DATA_SUCCESS', 
                payload: [{
                    folderID: 1,
                    name: "Trivia Folder",
                    flashcards: data
                }]
            });
        } catch (error) {
            dispatch({ 
                type: 'FETCH_DATA_ERROR', 
                payload: error 
            });
        }
}};

export const editFolder = (folderID, name, flashcards)=>{
    return {
        type: "EDIT-FOLDER",
        payload: { folderID, name, flashcards }
    };
}
export const addFlashcard = (folderID, newFlashcard)=>{
    return {
        type: "ADD-FLASHCARD",
        payload: { folderID, newFlashcard }
    }
}
export const toggleAnswer = (folderID, flashcardID)=>{
    return {
        type: "TOGGLE-ANSWER",
        payload: { folderID, flashcardID }
    }
}