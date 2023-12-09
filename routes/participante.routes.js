import express from "express";
import {
  deleteParticipante,
  getAllParticipantes,
  getParticipante,
  postParticipante,
  getCodigoQR,
  getParticipantes,
} from "../controllers/participante.js";
const router = express.Router();

router.get("/", getAllParticipantes);

router.get("/:id", getParticipante);

router.get("/usuarios/:postId", getParticipantes); //obtiene los participantes con el id del post

router.get("/:postId/:usuarioId/codigoqr", getCodigoQR); //obtiene codigo QR

router.post("/", postParticipante);

router.delete("/:id", deleteParticipante);

export default router;
