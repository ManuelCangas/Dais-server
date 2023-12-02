import { DataTypes } from "sequelize";
import db from "../database/db.js";


const Tag = db.define('tags',{
    etiqueta: { type: DataTypes.CHAR },
});

export default Tag;