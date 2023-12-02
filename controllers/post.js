import Post from "../models/post.js";
//imports
import multer from "multer";
import path from "path";

//Getall //Admin
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.log({ error: error.mesagge });
  }
};
//Get //Usuario o Admin
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    res.json(post);
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Post & Image //Usuario o Admin
export const postPost = async (req, res) => {
  try {
    const {
      titulo,
      description,
      fecha,
      ubication,
      tipo_id,
      usuario_id,
      tag_id,
    } = req.body;

    const rutaImg = req.file.filename;

    await Post.create({
      titulo,
      rutaImg,
      description,
      fecha,
      ubication,
      tipo_id,
      usuario_id,
      tag_id,
    });
    res.json({
      message: "Registro creado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({
      error: error.message,
      message: "Hubo un error al intentar crear el registro",
    });
  }
};
//Define la ruta donde se vendría a almacenar la imagen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Imagenes");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
//Guarda el archivo img definido previamente en el storage
const upload = multer({ storage });

//Patch //Usuario y Admin
export const patchPost = async (req, res) => {
  try {
    await Post.update({
      where: { id: req.params.id },
    });
    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};
//Delete
export const deletePost = async (req, res) => {
  try {
    await Post.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "Registro eliminado correctamente",
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export { upload };
