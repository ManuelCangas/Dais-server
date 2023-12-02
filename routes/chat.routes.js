import express from 'express'
import { deleteChat, getAllChats, getChat, patchChat, postChat } from '../controllers/chat.js'
const router = express.Router()

router.get('/', getAllChats)

router.get('/:id', getChat)

router.post('/', postChat)

router.patch('/:id', patchChat)

router.delete('/:id', deleteChat)

export default router;