// En un archivo como reportController.js
import Participante from "../models/participante.js";
import Post from "../models/post.js";

// Obtener información del participante y la publicación
export const getReportInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.findAll({
      where: { usuario_id: userId },
    });

    // Obtener participantes asociados a las publicaciones del usuario
    const participantesPromises = posts.map(async (post) => {
      const participantes = await Participante.findAll({
        where: { post_id: post.id },
      });

      return {
        post,
        participantes,
      };
    });

    // Esperar a que se resuelvan todas las promesas de participantes
    const reports = await Promise.all(participantesPromises);

    res.json({
      reports,
    });
  } catch (error) {
    console.error({ error: error.message });
    res.status(500).json({
      error: "Error al obtener la información del reporte",
    });
  }
};
