import "../styles/Quiz.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const { link } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/quiz/${link}`);
        if (!response.ok) throw new Error("Quiz not found");
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setQuiz(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [link]);

  // Handle option selection
  const handleSelect = (qIndex, optionValue) => {
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optionValue });
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    try {
      setSubmitted(true);
      const response = await fetch(
        `http://localhost:5000/api/quiz/submit/${link}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: selectedAnswers }),
        }
      );

      const result = await response.json();
      alert(`You scored ${result.score} out of ${result.totalQuestions}`);
      setTimeout(() => {
        navigate("/thank-you");
      }, 2500);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }

    setSubmitted(true);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (!quiz) return <p className="error">Quiz not found</p>;

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">{quiz.title}</h2>
      <div className="quiz-timer">Time Limit: {quiz.timeLimit} mins</div>

      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="quiz-card">
          <p className="quiz-question">
            {qIndex + 1}. {q.question}
          </p>
          <div className="quiz-options">
            {q.options.map((opt, optIndex) => (
              <label key={optIndex} className="radio-btn">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={opt}
                  checked={selectedAnswers[qIndex] === opt}
                  onChange={() => handleSelect(qIndex, opt)}
                  disabled={submitted}
                />
                {opt} {/* Option text */}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className="primary-button"
        onClick={handleSubmit}
        disabled={submitted}
      >
        {submitted ? "Quiz Submitted!" : "Submit Quiz"}
      </button>
    </div>
  );
}

export default Quiz;
