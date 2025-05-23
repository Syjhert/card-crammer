import mongoose from "mongoose";
import Folder from "../models/folderModel.js"
import { readFolders, writeFolders } from "../data/fileHandler.js";

// get all folders
export const getFolders = async(req, res, next) => {
    try {
        const folders = await Folder.find({}).sort({createdAt: -1});

        // update the folders.json file with the latest folders
        await writeFolders(folders);

        res.status(200).json(folders);
    } catch(error) {
        // pass the error to the next middleware
        // server.js has a error-handling middleware that handles this
        next(error);
    }
}

// get a single folder
export const getFolder = async(req, res, next) => {
    // get id from params "folder/id" to find the folder object in db
    const { id } = req.params;

    // check if the id is valid
    // MongoDB uses ObjectId which different from the typical string or int id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }

    try{
        const folder = await Folder.findById(id);

        if(!folder) {
            return res.status(404).json({error: "No such folder"});
        }

        res.status(200).json(folder);
    } catch(error) {
        next(error);
    }
}

// create new folder
export const createFolder = async (req, res, next) => {
    // get name from the fetch request body to create a new folder
    const { name } = req.body;

    // foldername validation check if undefined/null, not a string, or empty
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({ error: "Folder name is required and must be a non-empty string." });
    }

    if (name.length > 100) {
        return res.status(400).json({ error: "Folder name must be less than 100 characters." });
    }

    // add doc to db
    try {
        const folder = await Folder.create({name: name.trim(), flashcards: []});

        // update the folders.json file with the latest folders after a new one is created
        const foldersFromJSON = await readFolders();
        foldersFromJSON.push(folder);
        await writeFolders(foldersFromJSON);

        res.status(201).json(folder);
    } catch(error) {
        next(error);
    }
}

// delete a folder
export const deleteFolder = async (req, res, next) => {
    // get id from params "folder/id" to find the folder object in db
    const { id } = req.params;

    // check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }

    try {
        const folder = await Folder.findOneAndDelete({_id: id});
        if (!folder) {
            return res.status(400).json({error: "No such folder"});
        }
        res.status(200).json(folder);
    } catch(error) {
        next(error);
    }
}

// update a folder
export const updateFolder = async (req, res, next) => {
    // get id from params "folder/id" to find the folder object in db
    const { id } = req.params;

    // check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }

    // get the updated name of the folder from body
    const { name } = req.body;
    
    // foldername validation check if undefined/null, not a string, or empty
    if (!name || (typeof name !== "string" || name.trim() === "")) {
        return res.status(400).json({ error: "Folder name is required and must be a non-empty string." });
    }

    try{
        const folder = await Folder.findOneAndUpdate(
            {_id: id}, {
            ...req.body
        })
    
        if (!folder) {
            return res.status(400).json({error: "No such folder"});
        }
        res.status(200).json(folder);
    } catch(error) {
        next(error);
    }
}