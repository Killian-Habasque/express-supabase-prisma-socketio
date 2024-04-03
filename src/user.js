import express from "express";
import { supabase } from "../server.js"; // Importez l'instance de Supabase

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
  
    try {
  
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
  
      if (error) {
        throw error;
      }
  
      res.json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // L'utilisateur est connecté avec succès, vous pouvez envoyer des données supplémentaires si nécessaire
    res.json({ user, session });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    // L'utilisateur est déconnecté avec succès
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
