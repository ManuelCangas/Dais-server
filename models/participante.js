import { DataTypes } from "sequelize";
import QRCode from "qrcode";
import db from "../database/db.js";

const Participante = db.define("participantes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  post_id: { type: DataTypes.INTEGER },
  usuario_id: { type: DataTypes.INTEGER },
  fecha_registro: { type: DataTypes.DATE },
  fecha_participante: { type: DataTypes.DATE },
  asistencia: { type: DataTypes.TINYINT, defaultValue: 0 },
  codigo_QR: { type: DataTypes.STRING },
});

Participante.beforeCreate(async (participante) => {
  const dataToEncode = `${participante.usuario_id}-${participante.fecha_registro}`;
  try {
    const qrImage = await QRCode.toDataURL(dataToEncode);
    participante.codigo_QR = qrImage.substring(0, 255);
  } catch (error) {
    console.error("Error generating QR code: ", error);
  }
});

export default Participante;
