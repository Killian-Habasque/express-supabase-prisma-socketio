import express from "express";
import { prisma } from "./index.js";
export const boardRouter = express.Router();

boardRouter.get("/", async (req, res) => {
     const result = await prisma.board.findMany();
     res.json(result);
});

boardRouter.get("/:name", async (req, res) => {
     const result = await prisma.board.findUnique({
          include: { scores: true },
          where: {
               name: req.params.name,
          },
     });
     res.json(result);
});

boardRouter.post("/", async (req, res) => {
     try {
          const result = await prisma.board.create({
               data: {
                    name: req.body.name,
               },
          });
          res.json(result);
     } catch (error) {
          console.log(error)
          if (error.code === 'P2002') {
               console.log(
                 'There is a unique constraint violation'
               )
             }
          res.status(400).json({ error: error });
     }
});

boardRouter.delete("/:name", async (req, res) => {
     try {

          await prisma.score.deleteMany({
               where: {
                    board: {
                         name: req.params.name
                    }
               },
          });

          const result = await prisma.board.delete({
               where: {
                    name: req.params.name,
               },
          });
          res.json(result);
     } catch (error) {
          console.log(error)
          res.status(400).json({ error: error });
     }
});


boardRouter.get("/:name/scores", async (req, res) => {
     const result = await prisma.score.findMany({
          where: {
               board: {
                    name: req.params.name
               }
          },
     });
     res.json(result);
});


boardRouter.post("/:name/scores", async (req, res) => {
     try {
          const result = await prisma.score.create({
               data: {
                    value: req.body.value,
                    username: req.body.username,
                    board: {
                         connect: {name: req.params.name}
                    }
               },
          });
          res.json(result);
     } catch (error) {
          console.log(error)
          res.status(400).json({ error: error });
     }
});
