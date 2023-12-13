import express from "express";
import {
  deleteParticipante,
  getAllParticipantes,
  getParticipante,
  postParticipante,
  getCodigoQR,
  getParticipantes,
} from "../controllers/participante.js";
import { handleQRScan } from "../controllers/qrController.js";
import { authenticateToken } from "../middleware/authPlayer.js";

const router = express.Router();

router.get("/", getAllParticipantes);

router.post("/:postId", authenticateToken, getParticipante);

router.get("/usuarios/:postId", getParticipantes); //obtiene los participantes con el id del post

router.get("/:postId/:usuarioId/codigoqr", getCodigoQR); //obtiene codigo QR

router.post("/post/validarqr", authenticateToken, handleQRScan);

router.post("/:postId/create", authenticateToken, postParticipante);

router.delete("/:id", deleteParticipante);

export default router;
