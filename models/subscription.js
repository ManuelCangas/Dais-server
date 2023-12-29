import { DataTypes } from "sequelize";
import db from "../database/db.js";
import Usuario from "./usuario.js";

const Subscription = db.define("subscription", {
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_subs: { type: DataTypes.DATEONLY, allowNull: false },
  subscription: { type: DataTypes.TINYINT, allowNull: false },
});

Subscription.belongsTo(Usuario, { foreignKey: "usuario_id" });

export default Subscription;
