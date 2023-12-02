import Tipo from "../models/tipo.js";

//Getall
export const getAllTipos = async (req,res) => {
    try {
        const tipos = await Tipo.findAll()
        res.json(tipos)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Get
export const getTipo = async (req,res) => {
    try {
        const tipo = await Tipo.findAll({
            where: { id: req.params.id }
        })
        res.json(tipo)
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Post
export const postTipo = async (req,res) => {
    try {
        await Tipo.create(req.body)
        res.json({
            "message": "Registro creado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Patch
export const patchTipo = async (req,res) => {
    try {
        await Tipo.update({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro actualizado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}
//Delete
export const deleteTipo = async (req,res) => {
    try {
        await Tipo.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Tipo eliminado correctamente"
        })
    } catch (error) {
        console.log({ error: error.message })
    }
}