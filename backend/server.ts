import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

const prisma = new PrismaClient();

const app = express();
app.use(morgan("tiny"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/exercises", (req, res) => {
  prisma.exercise.findMany().then((exercises) => {
    res.send(exercises);
  });
});

app.post("/exercises", (req, res) => {
  prisma.exercise
    .create({
      data: {
        name: "Bench Press",
      },
    })
    .then((exercise) => {
      res.send(exercise);
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
