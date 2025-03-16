import { ObjectId } from "mongodb";
import { connectDB, closeConnection } from "./dbConnect.js";

// create new folder with name as its only field other than _id
// returns int - id of the newly created folder
export const createFolder = async (folderName) => {
    // wrap all code in a try block to detect errors
    try{
        // unpack foldersCollection only because that is what we only need for this function
        const { foldersCollection } = await connectDB();
        
        // mongodb insertOne function with object as its parameter, store result in variable to know result state
        const result = await foldersCollection.insertOne({name: folderName});
        console.log(`New Folder created with the following id: ${result.insertedId}`);

        // return insertedId (1) in case needed for future implementation
        return result.insertedId;
    }catch(e){
        // logs the state/function that caused the error
        console.log("Error: createFolder...");

        // propagate the error (in case used in future implementation)
        throw e;
    }finally{
        // close connection after every function to fetch new data for each query call
        closeConnection();
    }
}

// returns 
export const createFlashcard = async (folderID, newFlashcard) => {
    try{
        const { flashcardsCollection } = await connectDB();
        const result = await flashcardsCollection.updateOne(
            {_id: folderID},
            {$push: {flashcards: newFlashcard}}
        );
        console.log(`New flashcard created with the following id: ${folderID}`);
        console.log(result);
    }catch(e){
        console.log("Error: createFlashcard...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns boolean - if the folder exists/is found
export const folderExists = async (folderName) => {
    try{
        const { foldersCollection } = await connectDB();
        const result = await foldersCollection.findOne({name: folderName});
        return result != null;
    }catch(e){
        console.log("Error: folderExists...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns int - how many documents were examined before returning the object that needs to be found
export const explainDocumentFind = async (folderName) => {
    try{
        const { foldersCollection } = await connectDB();
        const result = await foldersCollection.find({name: folderName}).explain("executionStats");
        return result.executionStats.totalDocsExamined;
    }catch(e){
        console.log("Error: explainDocumentFind...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns list - all folders in the collection
export const getAllFolders = async () => {
    try{
        const { foldersCollection } = await connectDB();
        const folders = await foldersCollection.find().toArray();
        // console log each folder name for testing
        folders.forEach(folder => {
            console.log(folder.name);
        })
        return folders;
    }catch(e){
        console.log("Error: getAllFolders...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns list - all embedded flashcards in a folder object
export const getFlashcards = async (folderId) => {
    try{
        const { foldersCollection } = await connectDB();
        const flashcards = await foldersCollection.find(
            {_id: folderId},
            // only allows flashcards to be shown as the result
            {projection: {flashcards: 1}}
        );
        flashcards.forEach(flashcard => {
            console.log(flashcard);
        })
        return flashcards;
    }catch(e){
        console.log("Error: getFlashcards...");
        throw e;
    }finally{
        closeConnection();
    }
    
}

// returns int - how many object(s) were updated (0 if function failed, 1 if it worked)
export const updateFolderName = async (folderId, newFolderName) => {
    try{
        const { foldersCollection } = await connectDB();
        // $set new name for updated folder, the flashcards content of the folder is in the next function
        const result = await foldersCollection.updateOne({_id: folderId}, {$set: {name: newFolderName}})
        console.log(`Update folder result: `);
        console.log(result);
        return result.modifiedCount;
    }catch(e){
        console.log("Error: updateFolderName...");
        throw e;
    }finally{
        closeConnection();
    }
}

// not tested yet
export const updateFolderFlashcards = async (folderID, flashcards) => {
    try{
        // function was shortened due to new collections structure
        const { foldersCollection } = await connectDB();
        const result = await foldersCollection.updateOne(
            {_id: folderID},
            {$set: {flashcards: flashcards}}
        );
    }catch(e) {
        console.log("Error: updateFolderFlashcards...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns int - how many object(s) were deleted (0 if function failed, 1 if it worked)
export const deleteFolder = async (folderId) => {
    try{
        const { foldersCollection } = await connectDB();
        const result = await foldersCollection.deleteOne({_id: folderId});
        console.log(`Result when folder ${folderId} is deleted:`);
        console.log(result);
        return result.deleteCount;
    }catch(e){
        console.log("Error: deleteFolder...");
        throw e;
    }finally{
        closeConnection();
    }
}

// inserts filler data for folders and users collections
// returns nothing
export const insertFillerDocuments = async () => {
    const fillerFolders = [
        {
            _id: new ObjectId(),
            name: "Basic Math",
            flashcards: [
                {
                    _id: new ObjectId(),
                    question: "What 5 + 5?",
                    answer: "10",
                },
                {
                    _id: new ObjectId(),
                    question: "What is the value of pi? (two decimal places)",
                    answer: "3.14",
                }
            ]
        },
        {
            _id: new ObjectId(),
            name: "Chemistry",
            flashcards: [
                {
                    _id: new ObjectId(),
                    question: "What is the atomic number of Hydrogen?",
                    answer: "1",
                }
            ]
        }
    ];
    const fillerUsers = [
        {
            name: "Syjhert",
            email: "syjhert@gmail.com",
            folders: [
                {
                    folder_id: fillerFolders[0]._id, // Reference to the "Basic Math" folder
                }
            ]
        },
        {
            name: "Jorash",
            email: "jorash@gmail.com",
            folders: [
                {
                    folder_id: fillerFolders[1]._id, // Reference to the "Chemistry" folder
                }
            ]
        }
    ];
    try{
        const { foldersCollection, usersCollection } = await connectDB();
        // insert filler documents
        const foldersResult = foldersCollection.insertMany(fillerFolders);
        const usersResult = usersCollection.insertMany(fillerUsers);
        // logs result
        console.log(`Inserted ${(await foldersResult).insertedCount} folders`);
        console.log(`Inserted ${(await usersResult).insertedCount} users`);
        return;
    }catch(e){
        console.log("Error: insertFillerDocuments...");
        throw e;
    }finally{
        closeConnection();
    }
}

// returns array - all folders associated with the given email, each with folder name and number of flashcards
export const getFolderStatsByEmail = async (email) => {
    // aggregation pipeline to be used on the usersCollection
    const pipeline = [
        {
            // Stage 1
            // outputs all objects that matches the given email, only 1 object to be exact
            $match: {
                email: email
            }
        },
        {
            // Stage 2
            // for each object in folders field, a new document is created
            // for example if folders has two objects (containing folder_id reference), this stage returns two objects with all the same fields except folders which is now an object, not a list
            // {folders: [{folder_id: 1}, {folder_id: 2}]} => [{folders: {folder_id: 1}}, {folders: {folder_id: 2}}]
            $unwind: {
                path: "$folders"
            }
        },
        {
            // Stage 3
            // for all documents, import a document from folders to match userCollection's "folders.folder_id" with folderCollection's "_id" and name it as "folderDetails"
            $lookup: {
                from: "folders",
                localField: "folders.folder_id",
                foreignField: "_id",
                as: "folderDetails"
            }
        },
        {
            // Stage 4
            // like in stage 2, but since folder_id is reference to only 1 object, this just unwraps the folderDetails from an array into an object
            // folderDetails: [{name: "test", flashcards: []}] => folderDetails: {name: "test", flashcards: []}
            $unwind: {
                path: "$folderDetails"
            }
        },
        {
            // Stage 5
            // selectively choose which fields to show in the final output
            // for each document, I choose to show the name of the folder and the number of flashcards each contained for analytics
            $project: {
                folderName: "$folderDetails.name",
                totalFlashcards: {
                    $size: "$folderDetails.flashcards"
                },
                _id: 0  // _id automatically shows, so I explicitly said to not show it
            }
        }
    ];

    try{
        const { usersCollection } = await connectDB();
        const aggregateResult = await usersCollection.aggregate(pipeline).toArray();
        return aggregateResult;
    }catch(e){
        console.log("Error: getFolderStatsByEmail...");
        throw e;
    }finally{
        closeConnection();
    }
}