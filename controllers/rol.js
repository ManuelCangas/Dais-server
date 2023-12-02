import Rol from "../models/rol.js";

//Getall Rol
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Get Rol
export const getRol = async (req, res) => {
  try {
    const rol = await Rol.findAll({
      where: { id: req.params.id },
    });
    res.json(rol);
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Post ROl
export const postRol = async (req, res) => {
  try {
    await Rol.create(req.body);
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Patch Rol
export const patchRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body; // Suponiendo que 'etiqueta' es el campo a actualizar

    const updatedRol = await Rol.update({ rol }, { where: { id } });

    if (updatedRol[0] === 1) {
      res.json({ message: "Rol actualizado correctamente" });
    } else {
      res
        .status(404)
        .json({ message: "No se encontró el rol para actualizar" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Delete Rol
export const deleteRol = async (req, res) => {
  try {
    await Rol.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "Registro eliminado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
