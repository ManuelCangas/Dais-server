import express from 'express'
import { deleteMensaje, getAllMensajes, getMensajes, postMensaje } from '../controllers/mensaje.js'
const router = express.Router()

router.get('/', getAllMensajes)

router.get('/:id', getMensajes)

router.post('/', postMensaje)

router.delete('/:id', deleteMensaje)

export default router;