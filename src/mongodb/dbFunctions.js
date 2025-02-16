import { connectDB, closeConnection } from "./dbConnect.js";

export const createFolder = async (folderName) => {
    const { foldersCollection } = await connectDB();
    const result = await foldersCollection.insertOne({name: folderName});
    console.log(`New Folder created with the following id: ${result.insertedId}`);
    closeConnection();
    return result.insertedId;
}

export const createFlashcard = async (newFlashcard) => {
    const { flashcardsCollection } = await connectDB();
    const result = await flashcardsCollection.insertOne(newFlashcard);
    console.log(`New flashcard created with the following id: ${result.insertedId}`);
    closeConnection();
    return result.insertedId;
}

export const getAllFolders = async () => {
    const { foldersCollection } = await connectDB();
    const folders = await foldersCollection.find().toArray();
    folders.forEach(folder => {
        console.log(folder.name);
    })
    closeConnection();
    return folders;
}

export const getFlashcards = async (folderId) => {
    const { flashcardsCollection } = await connectDB();
    const flashcards = await flashcardsCollection.find({folder_id: folderId}).toArray();
    flashcards.forEach(flashcard => {
        console.log(flashcard);
    })
    closeConnection();
    return flashcards;
}

export const updateFolderName = async (folderId, newFolderName) => {
    const { foldersCollection } = await connectDB();
    const result = await foldersCollection.updateOne({_id: folderId}, {$set: {name: newFolderName}})
    console.log(`Update folder result: `);
    console.log(result);
    closeConnection();
    return result.modifiedCount;
}

// not tested yet
export const updateFolderFlashcards = async (folderID, flashcards) => {
    const { flashcardsCollection } = await connectDB();

    // for loop, not forEach because await errors if it is inside another function (needs top level?)
    for (const flashcard of flashcards) {
        const identifier = { _id: flashcard._id };
        // for each flashcard, update each in the database, upsert is true so that if flashcard does not exist yet, its added
        const result = await flashcardsCollection.updateOne(identifier, {$set: flashcard}, {upsert: true});
        console.log(result);
    };

    // gets all flashcards' id and make them into one array
    const flashcardsId = flashcards.map(flashcard => flashcard._id);
    // deletes all document in the collection that are NOT IN (NIN) the flashcardsId array
    const result = await flashcardsCollection.deleteMany({_id: {$nin: flashcardsId}, folder_id: folderID});
    console.log(`Delete result: ${result}`);
    closeConnection();
}

export const deleteFolder = async (folderId) => {
    const { foldersCollection } = await connectDB();
    const result = await foldersCollection.deleteOne({_id: folderId});
    console.log(`Result when folder ${folderId} is deleted:`);
    console.log(result);
    closeConnection();
    return result.deleteCount;
}

// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("List of Databases:");
//     databasesList.databases.forEach(db => {
//         console.log(`- ${db.name}`);
//     });
// }