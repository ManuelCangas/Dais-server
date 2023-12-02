import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Tipo = db.define('tipos',{
    tipo: {type: DataTypes.STRING} 
});

export default Tipo;