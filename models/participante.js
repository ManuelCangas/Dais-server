import { DataTypes } from "sequelize";
import db from "../database/db.js";
import moment from "moment";
import Post from "./post.js";
import Usuario from "./usuario.js";

const Participante = db.define("participantes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "posts",
      key: "id",
    },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "usuarios",
      key: "usuario_id",
    },
  },
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fecha_participante: { type: DataTypes.DATE, allowNull: true },
  asistencia: { type: DataTypes.TINYINT, allowNull: true },
  codigo: { type: DataTypes.STRING },
});

Participante.belongsTo(Post, { foreignKey: "post_id" });
Participante.belongsTo(Usuario, { foreignKey: "usuario_id" });

Participante.beforeCreate(async (participante) => {
  const dataToEncode = `user: ${participante.usuario_id} -post: ${participante.post_id}`;
  try {
    participante.codigo = dataToEncode;
  } catch (error) {
    console.error("Error generando información del código: ", error);
  }
});

Participante.updateAsistencia = async (usuarioId, postId) => {
  try {
    // Busca el participante por usuario_id y post_id
    const participante = await Participante.findOne({
      where: { usuario_id: usuarioId, post_id: postId },
    });
    if (!participante) {
      console.error("Participante no encontrado");
      return false;
    }
    if (
      participante.asistencia !== null ||
      participante.fecha_participante !== null
    ) {
      console.error("Código ya escaneado anteriormente");
      return false;
    }
    participante.asistencia = 1;
    participante.fecha_participante = moment().format("YYYY-MM-DD HH:mm:ss");

    await participante.save();

    console.log(
      "Asistencia actualizada para el participante:",
      participante.id
    );
    return true;
  } catch (error) {
    console.error("Error al actualizar asistencia:", error);
    return false;
  }
};

export default Participante;
