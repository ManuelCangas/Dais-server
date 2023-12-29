// qrController.js
import Participante from "../models/participante.js";

export const handleQRScan = async (req, res) => {
  try {
    console.log("Usuario en handleQRScan:", req.user);
    const { data } = req.body;
    console.log("Datos del código QR recibidos:", { data });
    const usuarioIdToken = req.user.userId;
    console.log("Usuario del token:", usuarioIdToken);
    const { usuario_id, post_id } = parseQRData(data);
    console.log("Datos después de parseQRData:", { usuario_id, post_id });
    const result = await Participante.updateAsistencia(usuario_id, post_id);
    console.log("Resultado de la actualización de la asistencia:", result);
    if (!result) {
      return res.status(404).json({ message: "Participante no encontrado." });
    }
    // Enviar respuesta exitosa
    res.status(200).json({ message: "Asistencia actualizada exitosamente." });
  } catch (error) {
    console.error("Error en handleQRScan:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
// Función para extraer información del código QR
const parseQRData = (data) => {
  try {
    // Dividir la cadena y obtener los valores necesarios
    const [usuarioPart, postPart] = data.split("-");
    const usuario_id = usuarioPart.trim().split(" ")[1];
    const post_id = postPart.trim().split(" ")[1];

    console.log("Valores extraídos de parseQRData:", { usuario_id, post_id });

    return { usuario_id, post_id };
  } catch (error) {
    console.error("Error en parseQRData:", error);
    throw error; // Lanza el error para que pueda ser capturado en handleQRScan
  }
};
