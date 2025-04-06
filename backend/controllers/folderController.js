import mongoose from "mongoose";
import Folder from "../models/folderModel.js"

// get all folders
export const getFolders = async(req, res, next) => {
    try {
        const folders = await Folder.find({}).sort({createdAt: -1});
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

    // foldername validation check if empty
    if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Folder name is required." });
    }

    // add doc to db
    try {
        const folder = await Folder.create({name, flashcards: []});
        res.status(200).json(folder);
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

    try{
        const folder = await Folder.findOneAndUpdate({_id: id}, {
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