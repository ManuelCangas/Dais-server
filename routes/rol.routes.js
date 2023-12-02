import express from 'express';
import { deleteRol, getAllRoles, getRol, patchRol, postRol } from '../controllers/rol.js';
const router = express.Router();

router.get('/', getAllRoles)

router.get('/:id', getRol)

router.post('/', postRol)

router.patch('/:id', patchRol)

router.delete('/:id', deleteRol)

export default router;

