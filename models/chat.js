import { DataTypes } from "sequelize";
import db from "../database/db.js";

const Chat = db.define('chats',{
    fecha: {type: DataTypes.DATE},
    tipo: {type: DataTypes.INTEGER},
    usuario_emisor: {type: DataTypes.INTEGER},
    usuario_receptor: {type: DataTypes.INTEGER}
});

export default Chat;