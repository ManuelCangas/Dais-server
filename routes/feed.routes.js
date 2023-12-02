import express from 'express'
import { deleteFeed, getFeed, getallFeed, postFeed } from '../controllers/feed.js'
const router = express.Router()

router.get('/', getallFeed)

router.get('/:id', getFeed)

router.post('/', postFeed)

router.delete('/:id', deleteFeed)

export default router;