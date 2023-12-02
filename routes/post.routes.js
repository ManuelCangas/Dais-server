import express from 'express'
import { deletePost, getAllPost, getPost, patchPost, postPost} from '../controllers/post.js'
import { upload } from '../controllers/post.js'
const router = express.Router()

router.get('/', getAllPost)

router.get('/:id', getPost)

router.post('/', upload.single('rutaImg'), postPost)

router.patch('/:id', patchPost)

router.delete('/:id', deletePost)

export default router;