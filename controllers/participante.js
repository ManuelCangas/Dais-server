import Participante from "../models/participante.js";
import generateQRCode from "./qrController.js";

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
    const participante = await Participante.findAll({
      where: { id: req.params.id },
    });
    res.json(participante);
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Post
export const postParticipante = async (req, res) => {
  try {
    const participante = await Participante.create({
      post_id: req.body.post_id,
      usuario_id: req.body.usuario_id,
      fecha_registro: req.body.fecha_registro,
      fecha_participante: req.body.fecha_participante,
    });

    const qrDataURL = await generateQRCode(
      `${participante.usuario_id}-${participante.fecha_registro}`
    );
    participante.update({ codigo_QR: qrDataURL });
    res.status(201).json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al crear el registro",
    });
  }
};
fetch;
export const patchParticipante = async (req, res) => {
  try {
    await Participante.update(req.body, {
      where: { id: req.params.id },
    });

    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: "Error al actualizar el registro",
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
