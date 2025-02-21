const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();
const crypto = require("crypto");

// Create a quiz
router.post("/create", async (req, res) => {
  try {
    const { title, questions, timeLimit } = req.body;

    // Validation: Ensure required fields are present
    if (!title || !questions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const quizLink = crypto.randomBytes(5).toString("hex");

    const formattedQuestions = questions.map((q) => ({
      question: q.description,
      options: q.options,
      correctAnswer: q.correctOption - 1,
    }));

    let link = `http://localhost:3000/quiz/${quizLink}`;

    const newQuiz = new Quiz({
      title,
      questions: formattedQuestions,
      timeLimit,
      link: quizLink,
    });

    await newQuiz.save();

    res.status(201).json({ message: "Quiz created successfully!", link: link });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Fetch quiz by link
router.get("/:link", async (req, res) => {
  const quiz = await Quiz.findOne({ link: req.params.link });

  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  res.json(quiz);
});

// Endpoint to submit answers
router.post("/submit/:link", async (req, res) => {
  try {
    const { link } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findOne({ link: link });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    let totalQuestions = quiz.questions.length;
    let correctAnswers = {};

    // Check answers
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.options[q.correctAnswer]) {
        score++;
      }
      correctAnswers[index] = q.correctOption; // Store correct answer
    });

    return res.json({
      message: "Quiz submitted successfully!",
      score,
      totalQuestions,
      correctAnswers,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

module.exports = router;
