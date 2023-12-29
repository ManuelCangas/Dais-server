import express from "express";
import cors from "cors";
import path from "path";
import db from "./database/db.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import rolRoutes from "./routes/rol.routes.js";
import tipoRoutes from "./routes/tipo.routes.js";
import postRoutes from "./routes/post.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import participanteRoutes from "./routes/participante.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/usuario", usuarioRoutes);
app.use("/rol", rolRoutes);
app.use("/tipo", tipoRoutes);
app.use("/post", postRoutes);
app.use("/tag", tagRoutes);
app.use("/participante", participanteRoutes);
app.use("/subscription", subscriptionRoutes);

app.use("/imagenes", express.static("./Imagenes"));

app.use(
  express.static(
    path.join(
      new URL(".", import.meta.url).pathname,
      "Estudios/Proyectos/Dais/client"
    )
  )
);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(
      new URL(".", import.meta.url).pathname,
      "Estudios/Proyectos/Dais/client",
      "index.html"
    )
  );
});

try {
  await db.authenticate();
  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.log(`No se pudo realizar la conexión : ${error}`);
}

app.listen(8000, () => {
  console.log("Escuchando en el puerto 8000");
});
