import { DataTypes } from "sequelize";
import { db } from "../database/db.js";
import Tipo from "./tipo.js";
import Usuario from "./usuario.js";
import Tag from "./tag.js";

const Post = db.define("posts", {
  titulo: { type: DataTypes.STRING, allowNull: false },
  rutaImg: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  ubication: { type: DataTypes.STRING, allowNull: false },
  estado: { type: DataTypes.BOOLEAN },
  tipo_id: { type: DataTypes.INTEGER, allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  tag_id: { type: DataTypes.INTEGER },
});

Post.belongsTo(Tipo, { foreignKey: "tipo_id" });
Post.belongsTo(Usuario, { foreignKey: "usuario_id" });
Post.belongsTo(Tag, { foreignKey: "tag_id" });

export default Post;
