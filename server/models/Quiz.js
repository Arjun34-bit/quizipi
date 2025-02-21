const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    },
  ],
  timeLimit: Number, // Minutes
  link: String,
});

module.exports = mongoose.model("Quiz", quizSchema);
