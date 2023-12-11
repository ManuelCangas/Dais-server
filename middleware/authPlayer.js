// authenticateToken middleware
import JWT from "jsonwebtoken";
import Usuario from "../models/usuario.js"; // Agrega esta línea

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token recibido:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación." });
  }
  JWT.verify(token, "your-secret-key", async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido." });
    }
    try {
      // Obtener el usuario desde la base de datos usando el ID del token
      const usuario = await Usuario.findByPk(decodedToken.userId);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      // Agregar la información del usuario al objeto req.user
      req.user = {
        userId: usuario.id,
        // Otros campos del usuario si son necesarios
      };
      console.log("Usuario autenticado:", req.user);
      next();
    } catch (error) {
      console.error("Error al obtener usuario desde la base de datos:", error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  });
};
