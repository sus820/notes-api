const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let notes = [];

// CREATE
app.post("/notes", (req, res) => {
  const note = {
    id: Date.now(),
    text: req.body.text,
  };

  notes.push(note);
  res.status(201).json(note);
});

// READ
app.get("/notes", (req, res) => {
  res.json(notes);
});

// UPDATE
app.put("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  note.text = req.body.text;
  res.json(note);
});

// DELETE
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter((n) => n.id !== id);

  res.json({ message: "Note deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});