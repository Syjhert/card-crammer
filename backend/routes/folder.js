import express from 'express'
import { getFolders, 
    getFolder, 
    createFolder, 
    deleteFolder, 
    updateFolder 
} from '../controllers/folderController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router()

// GET all flashcards
router.get('/', protect, getFolders);
// GET a single flashcard
router.get('/:id', protect, getFolder)

// POST a new flashcard
router.post('/', protect, restrictTo('admin'), createFolder);

// DELETE a flashcard
router.delete('/:id', protect, restrictTo('admin'), deleteFolder);

// UPDATE a flashcard
router.patch('/:id', protect, restrictTo('admin'), updateFolder);

export default router;