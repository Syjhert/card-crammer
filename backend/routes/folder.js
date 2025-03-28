import express from 'express'
import { getFolders, 
    getFolder, 
    createFolder, 
    deleteFolder, 
    updateFolder 
} from '../controllers/folderController.js';

const router = express.Router()

// GET all flashcards
router.get('/', getFolders);
// GET a single flashcard
router.get('/:id', getFolder)

// POST a new flashcard
router.post('/', createFolder);

// DELETE a flashcard
router.delete('/:id', deleteFolder);

// UPDATE a flashcard
router.put('/:id', updateFolder);

export default router;