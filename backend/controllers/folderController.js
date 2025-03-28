import mongoose from "mongoose";
import Folder from "../models/folderModel.js"

// get all folders
export const getFolders = async(req, res) => {
    const folders = await Folder.find({}).sort({createdAt: -1});
    res.status(200).json(folders);
}

// get a single folder
export const getFolder = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }
    const folder = await Folder.findById(id);

    if(!folder) {
        return res.status(404).json({error: "No such folder"});
    }

    res.status(200).json(folder);
}

// create new folder
export const createFolder = async (req, res) => {
    const { name } = req.body;
    const emptyArr = [];

    // add doc to db
    try {
        const folder = await Folder.create({name, emptyArr});
        res.status(200).json(folder);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// delete a folder
export const deleteFolder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }

    const folder = await Folder.findOneAndDelete({_id: id});
    if (!folder) {
        return res.status(400).json({error: "No such folder"});
    }
    res.status(200).json(folder);
}

// update a folder
export const updateFolder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such folder"});
    }

    const folder = await Folder.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!folder) {
        return res.status(400).json({error: "No such folder"});
    }
    res.status(200).json(folder);
}