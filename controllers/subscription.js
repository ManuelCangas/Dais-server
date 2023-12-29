import Subscription from "../models/subscription.js";

export const getSubscriptions = async (req, res) => {
  try {
    const usuario_id = req.user.userId;
    const subscriptions = await Subscription.findAll({
      where: { usuario_id: usuario_id },
      attributes: ["fecha_subs", "subscription"],
    });

    return res.status(200).json({
      success: true,
      message: "Suscripción obtenida exitosamente",
      data: subscriptions,
    });
  } catch (error) {
    console.error("Error al obtener suscripciones:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const createSubscription = async (req, res) => {
  try {
    const { number, expiry, cvc, name } = req.body;
    const usuarioId = req.user.userId;
    console.log("Intentando obtener datos del usuario. UserID:", usuarioId);

    if (!usuarioId) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const newSubscription = await Subscription.create({
      usuario_id: usuarioId,
      fecha_subs: new Date(),
      subscription: 1, // O el valor que corresponda
    });

    return res.status(201).json({
      success: true,
      message: "Suscripción creada exitosamente",
      data: newSubscription,
    });
  } catch (error) {
    console.error("Error al crear la suscripción:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
