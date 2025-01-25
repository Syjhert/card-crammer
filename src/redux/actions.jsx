import { createAsyncThunk } from "@reduxjs/toolkit";

export const addNewFolder = (name) => ({
    type: "ADD-FOLDER",
    payload: { name },
  });
  
export const fetchFolders = createAsyncThunk("folders/fetchFolders", async (_, { getState })=> {
  const { folders } = getState(); // Access current state
  const cachedData = folders.data; // Data already stored in Redux
  console.log("Fetch called");

  // If data already exists in the state, return it and skip the API call
  if ((cachedData && cachedData.length > 0) || folders.cached) {
    console.log("Returned cached data");
    return cachedData;
  }


  const url = 'https://quizmania-api.p.rapidapi.com/random-trivia';
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
    const payload = [
      {
        folderID: 1,
        name: "Trivia Folder",
        flashcards: data,
      },
    ];
    return payload;
  } catch (error) {
    throw Error(error);
  }
})

export const editFolder = (folderID, name, flashcards) => ({
  type: "EDIT-FOLDER",
  payload: { folderID, name, flashcards },
});

export const addFlashcard = (folderID, newFlashcard) => ({
  type: "ADD-FLASHCARD",
  payload: { folderID, newFlashcard },
});

export const toggleAnswer = (folderID, flashcardID) => ({
  type: "TOGGLE-ANSWER",
  payload: { folderID, flashcardID },
});