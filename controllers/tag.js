import Tag from "../models/tag.js"

//Crud de Tags

//Getall
export const getAllTags = async (req,res) =>{
    try {
        const tags = await Tag.findAll();
        res.json(tags)
    } catch (error) {
        res.json({ error: error.message })
    }
}
//Get 
export const getTag = async (req,res) =>{
    try {
        const tag = await Tag.findAll({
            where: { id: req.params.id }
        })
        res.json(tag)
    } catch (error) {
        res.json({ error: error.message })
    }
}
//Post
export const postTag = async (req,res) =>{
    try {
        await Tag.create(req.body)
        res.json({
            "message": "Registro creado correctamente" 
        })
    } catch (error) {
        res.json({ error: error.message })
    }
} 
//Patch
export const patchTag = async (req, res) => {
    try {
      const { id } = req.params;
      const { etiqueta } = req.body; // Suponiendo que 'etiqueta' es el campo a actualizar
  
      const updatedTag = await Tag.update({ etiqueta }, { where: { id } });
  
      if (updatedTag[0] === 1) {
        res.json({ message: 'Etiqueta actualizada correctamente' });
      } else {
        res.status(404).json({ message: 'No se encontró la etiqueta para actualizar' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
//Delete
export const deleteTag = async (req,res) => {
    try {
        await Tag.destroy({
            where: { id: req.params.id }
        })
        res.json({
            "message": "Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({ error: error.message })
    }
}