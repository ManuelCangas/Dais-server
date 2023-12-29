import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import bcrypt from "bcrypt";

const Usuario = db.define("usuarios", {
  id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING },
  mail: { type: DataTypes.STRING },
  nickname: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  edad: { type: DataTypes.DATE },
  sexo: { type: DataTypes.STRING },
  usuario_rol: { type: DataTypes.INTEGER },
  usuario_sub: { type: DataTypes.INTEGER, allowNull: true },
});
Usuario.beforeCreate(async (usuario, options) => {
  const hashedPassword = await bcrypt.hash(usuario.password, 10); // Aplica seguridad de Hash a la contraseña
  usuario.password = hashedPassword; // Actualiza el campo de contraseña con el hash
});
Usuario.prototype.validarContraseña = async function (contraseña) {
  try {
    return await bcrypt.compare(contraseña, this.password);
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    return false;
  }
};

export default Usuario;
