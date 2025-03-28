import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: String,
    flashcards: [{
        question: String,
        answer: String
    }]
}, { timestamps: true })

export default mongoose.model('Folder', folderSchema);