import { DataTypes } from "sequelize";
import QRCode from "qrcode";
import db from "../database/db.js";
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
  fecha_registro: { type: DataTypes.DATE },
  fecha_participante: { type: DataTypes.DATE },
  asistencia: { type: DataTypes.TINYINT, defaultValue: 0 },
  codigo_QR: { type: DataTypes.STRING },
});

Participante.belongsTo(Post, { foreignKey: "post_id" });
Participante.belongsTo(Usuario, { foreignKey: "usuario_id" });

Participante.beforeCreate(async (participante) => {
  const dataToEncode = `${participante.usuario_id}-${participante.fecha_registro}`;
  try {
    const qrImage = await QRCode.toString(dataToEncode);
    participante.codigo_QR = qrImage;
  } catch (error) {
    console.error("Error generating QR code: ", error);
  }
});

export default Participante;
