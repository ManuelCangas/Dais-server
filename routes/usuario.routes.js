import express from "express";
import {
  deleteUsuario,
  getAllUsuarios,
  getUsuario,
  logUsuario,
  logTienda,
  patchUsuario,
  postUsuario,
  logAdmin,
  getUsuarioActual,
} from "../controllers/usuario.js";
import { authenticateToken } from "../middleware/AuthPlayer.js";

const router = express.Router();

router.get("/", getAllUsuarios);

router.get("/:id", getUsuario);

router.post("/", postUsuario);

router.post("/login", logUsuario);

router.post("/logTienda", logTienda);

router.post("/logAdmin", logAdmin);

router.post("/perfil", authenticateToken, getUsuarioActual);

router.patch("/:id", patchUsuario);

router.delete("/:id", deleteUsuario);

export default router;
