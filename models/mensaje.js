import { DataTypes } from "sequelize";
import db from "../database/db.js";


const Mensaje = db.define('mensajes',{
    texto: {type: DataTypes.STRING},
    imagen: {Type: DataTypes.STRING},
    fecha: {type: DataTypes.DATE},
    eliminados: {type: DataTypes.TINYINT},
    chat_id: {type: DataTypes.INTEGER}
});

export default Mensaje;