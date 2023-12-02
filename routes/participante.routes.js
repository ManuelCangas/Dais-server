import express from "express";
import {
  deleteParticipante,
  getAllParticipantes,
  getParticipante,
  patchParticipante,
  postParticipante,
} from "../controllers/participante.js";
const router = express.Router();

router.get("/", getAllParticipantes);

router.get("/:id", getParticipante);

router.post("/", postParticipante);

router.patch("/:id", patchParticipante);

router.delete("/:id", deleteParticipante);

export default router;
