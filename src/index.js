import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { boardRouter } from "./board.js";

import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
    },
    (payload) => console.log(payload)
  )
  .subscribe()

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
