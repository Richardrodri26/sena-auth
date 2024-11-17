import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, createUser } from "../models/user.model";

const router = Router();
const SECRET_KEY = "mi_clave_secreta";

router.post("/register", async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }

  const user = await findUserByUsername(username);
  if (user) {
    return res.status(400).json({ message: "El usuario ya existe." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, hashedPassword);
  res.status(201).json({ message: "Usuario registrado exitosamente." });
});

router.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }

  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos." });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Autenticación satisfactoria.", token });
});

export default router;
