import { DataTypes } from "sequelize";
import { db } from "../database/db.js";

const Rol = db.define('rols',{
    rol: {type: DataTypes.STRING}
})

export default Rol;