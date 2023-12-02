import Mensaje from "../models/mensaje";

//GetAll
export const getAllMensajes = async (req,res) => {
    try {
        const mensajes = await Mensaje.findAll()
        res.json(mensajes)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Get
export const getMensajes = async (req,res) => {
    try {
        const mensaje = await Mensaje.findAll({
            where: { id: req.params.id }
        })
        res.json(mensaje)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Post
export const postMensaje = async (req,res) => {
    try {
        await Mensaje.create(req.body)
        res.json({
            "message": "Mensaje creado"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Delete
export const deleteMensaje = async (req,res) => {
    try {
        await Mensaje.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Mensaje eliminado"
        })
    } catch (error) {
        
    }
}