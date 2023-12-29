import Participante from "../models/participante.js";
import Usuario from "../models/usuario.js";

//GetAll
export const getAllParticipantes = async (req, res) => {
  try {
    const participantes = await Participante.findAll();
    res.json(participantes);
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Get
export const getParticipante = async (req, res) => {
  try {
    const { postId } = req.params;
    const usuarioId = req.user.userId;
    const participante = await Participante.findOne({
      where: { post_id: postId, usuario_id: usuarioId },
    });
    if (participante) {
      // Si el participante existe, envía la información del participante
      res.json(participante);
    } else {
      // Si no existe, envía un mensaje indicando que no se encontró el participante
      res.json({ message: "No se encontró el participante" });
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
//Obtener QR
export const getCodigoQR = async (req, res) => {
  try {
    const { postId, usuarioId } = req.params;
    console.log("usuario: ", usuarioId, "publicación: ", postId);
    // Buscar participante por ID
    const participante = await Participante.findOne({
      where: { post_id: postId, usuario_id: usuarioId },
      attributes: ["codigo_QR"],
    });
    console.log("Código QR del participante:", participante.codigo_QR);
    // Verificar si el participante existe y tiene un código QR
    if (!participante || !participante.codigo_QR) {
      return res.status(404).json({
        error:
          "No se encontró el participante o no tiene un código QR asociado.",
      });
    }
    // Devolver el código QR y el ID del usuario
    res.json({
      codigoQR: participante.codigo_QR,
      usuarioId: participante.usuario_id,
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al obtener el código QR",
    });
  }
};
//Obtener usuarios participantes
export const getParticipantes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const participantes = await Participante.findAll({
      where: { post_id: postId },
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre", "nickname"],
          as: "usuario",
        },
      ],
    });
    // Mapear la respuesta
    const participantesConNombres = participantes.map((participante) => ({
      id: participante.id,
      nombre: participante.usuario.nombre,
      nickname: participante.usuario.nickname,
      asistencia: participante.asistencia,
    }));
    res.json(participantesConNombres);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al obtener la lista de participantes con nombres",
      errorMessage: error.message,
    });
  }
};
//Post
export const postParticipante = async (req, res) => {
  try {
    const post_id = req.params.postId;
    const usuario_id = req.user.userId;
    // Validar que se reciben los datos necesarios
    if (!post_id || !usuario_id) {
      return res.status(400).json({
        error: "No hay post o usuario",
      });
    }
    const participante = await Participante.create({
      post_id: post_id,
      usuario_id: usuario_id,
    });
    res.status(201).json({
      message: "Registro creado correctamente",
      participante: participante,
    });
    console.log(participante);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al crear el registro",
    });
  }
};
//Delete
export const deleteParticipante = async (req, res) => {
  try {
    await Participante.destroy({
      where: { id: req.params.id },
    });

    res.json({
      message: "Registro eliminado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al eliminar el registro",
    });
  }
};
