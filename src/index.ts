import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();
const PORT = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Registrar las rutas
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando. Rutas: /auth/register (POST), /auth/login (POST)" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
