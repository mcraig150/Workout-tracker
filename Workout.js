  
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var workoutSchema = new Schema({
  day: { type: Date, default: Date.now },
  exercises: [{}],
  });

var Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;