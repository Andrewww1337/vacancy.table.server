import { Router } from 'express';
import * as userService from '../services/user-service';

const router = Router();

router.get('/all-notes', userService.getAllNotes);
router.post('/update-note', userService.updateNote);
router.post('/add-note', userService.addNote);
router.delete('/delete-notes', userService.deleteNote);

export { router as UserRouter };
