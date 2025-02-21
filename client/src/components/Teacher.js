import "../styles/Teacher.css";
import React, { useState } from "react";
import axios from "axios";

function Teacher() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [timeLimit, setTimeLimit] = useState(10);
  const [quizLink, setQuizLink] = useState("");

  // Add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { description: "", options: ["", "", "", ""], correctOption: "" },
    ]);
  };

  // Update question description
  const updateQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].description = text;
    setQuestions(updatedQuestions);
  };

  // Update option values
  const updateOption = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Update correct option number
  const updateCorrectOption = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctOption = value;
    setQuestions(updatedQuestions);
  };

  // Delete a question
  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // Submit quiz
  const createQuiz = async () => {
    try {
      const { data } = await axios.post("/api/quiz/create", {
        title,
        questions,
        timeLimit,
      });
      setQuizLink(data.link);
    } catch (error) {
      console.error("Error creating quiz", error);
    }
  };

  return (
    <div className="teacher-panel">
      <h2>Create Quiz</h2>
      <div className="form-group">
        <label>Quiz Title:</label>
        <input
          type="text"
          placeholder="Enter quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Time Limit (minutes):</label>
        <input
          type="number"
          value={timeLimit}
          min="1"
          onChange={(e) => setTimeLimit(e.target.value)}
        />
      </div>

      <h3>Questions</h3>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="question-card">
          <label>Question {qIndex + 1} Description:</label>
          <textarea
            placeholder="Enter question description"
            value={q.description}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
          ></textarea>

          <label>Options:</label>
          {q.options.map((opt, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
            />
          ))}

          <label>Correct Option (1-4):</label>
          <input
            type="number"
            min="1"
            max="4"
            value={q.correctOption}
            onChange={(e) => updateCorrectOption(qIndex, e.target.value)}
          />

          <button className="delete-btn" onClick={() => removeQuestion(qIndex)}>
            ❌ Delete
          </button>
        </div>
      ))}

      <button className="secondary-button" onClick={addQuestion}>
        ➕ Add Question
      </button>
      <button
        className="primary-button"
        onClick={createQuiz}
        disabled={questions.length === 0}
      >
        🚀 Create Quiz
      </button>

      {quizLink && (
        <p className="quiz-link">
          Quiz Link:{" "}
          <a href={quizLink} target="_blank" rel="noopener noreferrer">
            {quizLink}
          </a>
        </p>
      )}
    </div>
  );
}

export default Teacher;
