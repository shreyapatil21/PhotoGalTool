import { Router } from 'express';
const router = Router();
import auth from '../middlewares/auth.js';
import { upload, uploadPhoto, getPhotos, deletePhoto, updateTags } from '../controllers/photoController.js';

router.post('/upload', auth, upload.single('file'), uploadPhoto);
router.get('/', auth, getPhotos);
router.delete('/:id', auth, deletePhoto);
router.put('/:id/tags', auth, updateTags);

export default router;

