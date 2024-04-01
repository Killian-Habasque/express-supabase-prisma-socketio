// Dans src/index.js
import express from "express";
import http from "http"; // Importez le module HTTP
import { Server } from "socket.io"; // Importez le module Socket.io
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { boardRouter } from "./src/board";

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const prisma = new PrismaClient();

export const app = express();
const PORT = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected");
});

supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
    },
    (payload) => {
      console.log(payload);
      io.emit("databaseChange", payload); // Émettez l'événement vers le front-end via WebSocket
    }
  )
  .subscribe();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", express.static("./public"));
app.use("/boards", boardRouter);

app.delete("/score/:id", async (req, res) => {
  try {
    const result = await prisma.score.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
});

server.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

export default server;