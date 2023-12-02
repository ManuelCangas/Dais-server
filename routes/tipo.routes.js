import express from "express"
import { deleteTipo, getAllTipos, getTipo, patchTipo, postTipo } from '../controllers/tipo.js'
const router = express.Router();

router.get( '/', getAllTipos )

router.get( '/:id', getTipo )

router.post( '/', postTipo )

router.patch( '/:id', patchTipo )

router.delete( '/:id', deleteTipo )

export default router;