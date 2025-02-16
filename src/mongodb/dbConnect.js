import { MongoClient } from "mongodb";

const uri = "mongodb+srv://host:123@cluster0.4mbdl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

    client = new MongoClient(uri);

    try{
        await client.connect();

        database = client.db("card_crammer");
        foldersCollection = database.collection("folders");
        flashcardsCollection = database.collection("flashcards");
        return {foldersCollection, flashcardsCollection};
    } catch(e){
        console.error(`There was an error when connecting to db ${e}`);
    }
}

export const closeConnection = async () => {
    if (client) {
        await client.close();
        console.log("Database connection closed");
        client = null;
        database = null;
        foldersCollection = null;
        flashcardsCollection = null;
    }
}