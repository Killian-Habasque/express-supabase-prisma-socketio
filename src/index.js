import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { boardRouter } from "./board.js";

export const prisma = new PrismaClient();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use( "/", express.static("./public"));
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
          console.log(error)
          res.status(400).json({ error: error });
     }
});

app.listen(PORT, () => {
     console.log("Example app listening on port " + PORT);
});
