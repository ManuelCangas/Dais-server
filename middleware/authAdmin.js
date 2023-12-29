// Nuevo middleware específico para autenticación de publicaciones
import JWT from "jsonwebtoken";
import Usuario from "../models/usuario.js";

export const authenticateAdminToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación." });
  }

  JWT.verify(token, "admin-secret-key", async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido." });
    }

    try {
      const usuario = await Usuario.findByPk(decodedToken.userId);

      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Agregar la información del usuario al objeto req.user
      req.user = {
        userId: usuario.id,
        // Otros campos del usuario si son necesarios
      };

      console.log("UserID en authenticatePostToken:", req.user.userId);
      next();
    } catch (error) {
      console.error("Error al obtener usuario desde la base de datos:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
};
