import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Feed = db.define('feeds',{
    id_post: {type: DataTypes.INTEGER},
    usuario_id: {type: DataTypes.INTEGER}
});

export default Feed;