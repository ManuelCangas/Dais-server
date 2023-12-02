import express from "express";
import { deleteTag, getAllTags, getTag, patchTag, postTag } from "../controllers/tag.js";
const router = express.Router();

router.get('/', getAllTags)

router.get('/:id', getTag)

router.post('/', postTag)

router.patch('/:id', patchTag)

router.delete('/:id', deleteTag)

export default router;