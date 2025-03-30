import { exec } from "child_process";
import { MongoClient } from "mongodb";

// URI includes card_crammer database name so that when creating backup, all the other unrelated databases will not be backed up
const uri = "mongodb+srv://host:123@cluster0.4mbdl.mongodb.net/card_crammer?retryWrites=true&w=majority&appName=Cluster0";
const databaseName = "card_crammer"
// global variables to avoid errors and redundant connection and closing of connection
let client;
let database;
let foldersCollection;
let usersCollection;

const folderSchema = {
    _id: "ObjectId",
    name: "String",
    ownerId: "ObjectId",
    flashcards: [
        {
            _id: "ObjectId",
            question: "String",
            answer: "String"
        }
    ]
}
const userSchema = {
    _id: "ObjectId",
    name: "String",
    email: "String",
    folders: [  //folders they created
        {folder_id: "ObjectId"}
    ]
}

export const connectDB = async () => {
    // if there is a database, the collections should be working fine, not included in if because the collection might be empty
    // although this may not be the case because every connectDB is followed by closeConnect
    if(database){
        return {foldersCollection, usersCollection};
    }

    // client that connects the URI (database) and the program
    client = new MongoClient(uri);

    try{
        // connect first
        await client.connect();

        // set database variable for more readable assignments
        // and global variable assignment
        database = client.db(databaseName);
        // set collections to global variables
        foldersCollection = database.collection("folders");
        usersCollection = database.collection("users");

        // create index for better query performace (lookup)
        await foldersCollection.createIndex({ownerId: 1, name: 1});
        // text index for folder name for future searching
        await foldersCollection.createIndex({name: "text"});
        
        // compound index for email, then name
        await usersCollection.createIndex({email: 1, name: 1});
        // No text index for user class because username search won't be needed I think

        // return collections as object for dbFunctions to select which to unpack
        return {foldersCollection, usersCollection};
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
        usersCollection = null;
    }
}

// local path for the database backup
const backupPath = "./dump";

// creates a backup of the database in the local folder
export const createBackup = () => {
    console.log("Creating backup");
    // console.log(`mongodump --uri="${uri}" --out="${backupPath}"`);
    exec(`mongodump --uri="${uri}" --out="${backupPath}"`);
    console.log("Backup created successfully?")
}

// restores the data of the database linked by the URI by using the local backuped data
export const restoreBackup = () => {
    console.log("Restoring backup");
    exec(`mongorestore --uri="${uri}" "${backupPath}/${databaseName}"`);
    console.log("Backup restored successfully?")
}