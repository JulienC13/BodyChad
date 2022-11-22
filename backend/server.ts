import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/exercises", (req, res) => {
  res.send([
    { id: 1, name: "Exercise 1" },
    { id: 2, name: "Exercise 2" },
  ]);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
