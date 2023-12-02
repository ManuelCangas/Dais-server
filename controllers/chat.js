import Chat from "../models/chat";

//GetAll
export const getAllChats = async (req,res) => {
    try {
        const chats = await Chat.findAll()
        res.json(chats)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Get
export const getChat = async (req,res) => {
    try {
        const chat = await Chat.findAll({
            where: { id: req.params.id }
        })
        res.json(chat)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Post
export const postChat = async (req,res) => {
    try {
        await Chat.create()
        res.json({
            "message": "Registro creado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Patch
export const patchChat = async (req,res) => {
    try {
        await Chat.update({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro actualizado"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Delete
export const deleteChat = async (req,res) => {
    try {
        await Chat.delete({
            where: { id: req.params.id }
        })
    } catch (error) {
        console.log({ error: error.message })
    }
} 