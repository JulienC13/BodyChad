import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";
import bodyParser from "body-parser";

const prisma = new PrismaClient();

const app = express();
app.use(morgan("tiny")); // Pour voir les logs
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Recuperer toutes les seances

app.get("/seances/:id", async (req, res) => {
  const id = req.params.id;
  const seance = await prisma.seance.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { exercises: true },
  });
  res.json(seance);
});

app.get("/seances", async (req, res) => {
  try {
    const seances = await prisma.seance.findMany();
    res.json(seances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: { error } });
  }
});

app.post("/seances", async (req, res) => {
  // 1. prendre la data
  const data = req.body;

  console.log(data.exercises);
  // 2. l'ajouter en base de donnee
  const seance = await prisma.seance.create({
    data: {
      title: data.title,
      exercises: {
        create: data.exercises,
      },
    },
  });
  const seanceWithExercises = await prisma.seance.findUnique({
    where: {
      id: seance.id,
    },
    include: {
      exercises: true,
    },
  });

  // 3. renvoyer la reponse avec ce qui a ete ajoute
  res.send(seanceWithExercises);
});

app.get("/performances", async (req, res) => {
  try {
    console.log("test");
    const performance = await prisma.exerciseSeries.findMany({
      include: {
        exercise: true,
      },
    });
    res.json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: { error } });
  }
});

app.post("/performances", async (req, res) => {
  const data = req.body;
  const performance = await prisma.exerciseSeries.create({
    data: {
      exerciseId: data.exerciseId,
      reps: parseInt(data.reps),
      weight: parseInt(data.weight),
    },
  });
  res.send(performance);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
