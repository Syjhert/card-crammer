import { MongoClient } from "mongodb";

const uri = "mongodb+srv://host:123@cluster0.4mbdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// global variables to avoid errors and redundant connection and closing of connection
let client;
let database;
let foldersCollection;
let flashcardsCollection;

export const connectDB = async () => {
    // if there is a database, the collections should be working fine, not included in if because the collection might be empty
    // although this may not be the case because every connectDB is followed by closeConnect
    if(database){
        return {foldersCollection, flashcardsCollection};
    }

    // client that connects the URI (database) and the program
    client = new MongoClient(uri);

    try{
        // connect first
        await client.connect();

        // set database variable for more readable assignments
        // and global variable assignment
        database = client.db("card_crammer");
        // set collections to global variables
        foldersCollection = database.collection("folders");
        flashcardsCollection = database.collection("flashcards");
        // return collections as object for dbFunctions to select which to unpack
        return {foldersCollection, flashcardsCollection};
    } catch(e){
        console.error(`There was an error when connecting to db ${e}`);
    }
}

export const closeConnection = async () => {
    // if there is a client, there is a connection
    if (client) {
        await client.close();
        console.log("Database connection closed");
        // assign null to every global variables for blank slate state
        client = null;
        database = null;
        foldersCollection = null;
        flashcardsCollection = null;
    }
}