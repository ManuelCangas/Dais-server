import Usuario from "../models/usuario.js";
import JWT from "jsonwebtoken";
//CRUD usuarios

//Get all
export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
// Get a user by ID
export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};
// Obtener información del usuario actual basado en el token de autenticación
export const getUsuarioActual = async (req, res) => {
  try {
    console.log(
      "Intentando obtener datos del usuario. UserID:",
      req.user.userId
    );

    const usuario = await Usuario.findByPk(req.user.userId, {
      attributes: ["nombre", "mail", "nickname", "edad", "sexo"],
    });

    console.log("Resultado de la consulta:", usuario);

    if (!usuario) {
      console.error("Usuario no encontrado");
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      nombre: usuario.nombre,
      mail: usuario.mail,
      nickname: usuario.nickname,
      edad: usuario.edad,
      sexo: usuario.sexo,
    });
  } catch (error) {
    console.error("Error al obtener datos del usuario actual:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Post Usuario Jugador & validar
export const logUsuario = async (req, res) => {
  const { nickname, password } = req.body;
  console.log(req.body);
  try {
    console.log(`Intento de inicio de sesión de : ${nickname}`);
    const usuario = await Usuario.findOne({
      where: { nickname: nickname, usuario_rol: 1 },
    });
    if (!usuario) {
      return res.status(401).json({ message: "Credencial usuario invalida" });
    }
    const isValidatedPassword = await usuario.validarContraseña(password); // Validar Hash de contraseña
    if (!isValidatedPassword) {
      return res.status(401).json({ message: "Credencial usuario invalida" });
    }
    const token = JWT.sign(
      { userId: usuario.id, nickname: usuario.nickname },
      "your-secret-key",
      {
        expiresIn: "1h", // Expiración del token
      }
    );
    // Devolver la información del usuario junto con el token
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        mail: usuario.mail,
        nickname: usuario.nickname,
        edad: usuario.edad,
        sexo: usuario.sexo,
      },
    });
    console.log("ID del usuario:", usuario.id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
//Post Admin & validar
export const logAdmin = async (req, res) => {
  const { nickname, password } = req.body;
  console.log(req.body);
  try {
    console.log(`Intento de inicio de sesión de  : ${nickname}`);
    const usuario = await Usuario.findOne({
      where: {
        nickname: nickname,
        usuario_rol: 3,
      },
    });
    if (!usuario) {
      return res.status(401).json({ message: "Credencial usuario invalida" });
    }
    const isValidatedPassword = await usuario.validarContraseña(password);
    if (!isValidatedPassword) {
      return res.status(401).json({ message: "Credencial usuario invalida" });
    }
    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

//Post Usuario Tienda & Validar
export const logTienda = async (req, res) => {
  const { nickname, password } = req.body;
  console.log(req.body);
  try {
    console.log(`Intento de inicio de sesión de tienda: ${nickname}`);
    const usuario = await Usuario.findOne({
      where: {
        nickname: nickname,
        usuario_rol: 2,
      },
      attributes: ["nickname", "password"], //Solo devuelve los atributos
    });
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Credencial de Tienda es invalida" });
    }
    const isValidatedPassword = await usuario.validarContraseña(password);
    if (!isValidatedPassword) {
      return res.status(401).json({ message: "Credencial usuario invalida" });
    }
    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
//Crear Usuario
export const postUsuario = async (req, res) => {
  try {
    await Usuario.create(req.body);
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
//Patch User
export const patchUsuario = async (req, res) => {
  try {
    await Usuario.update(req, res, {
      where: { id: req.params.id },
    });
    res.json({
      message: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
//Delete User
export const deleteUsuario = async (req, res) => {
  try {
    await Usuario.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "Registro eliminado correctamente",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};
