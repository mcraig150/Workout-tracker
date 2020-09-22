const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./Workout.js");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public", { "extensions": "html" }));

app.post("/api/workouts", (req, res) => {
  Workout.create(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put("/api/workouts/:id", (req, res) => {
  Workout.update(
    {
      _id: req.params.id,
    },
    {
      $push: {
        exercises: req.body,
      },
      $inc: {
        totalDuration: req.body.duration,
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

app.get("/api/workouts", (req, res) => {
  Workout.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on localhost:${port}`));
