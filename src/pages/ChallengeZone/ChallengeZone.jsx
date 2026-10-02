import React, { useEffect, useMemo, useState } from "react";
import "./ChallengeZone.css";
import { quizData } from "../../data/courseData";

export default function ChallengeZone() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(quiz.duration * 60);
  };

  /* -----------------------------------------------------
     TIMER
  ----------------------------------------------------- */

  useEffect(() => {
    if (!activeQuiz || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeQuiz, submitted, timeLeft]);

  /* -----------------------------------------------------
     FORMAT TIMER
  ----------------------------------------------------- */

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  /* -----------------------------------------------------
     SELECT ANSWER
  ----------------------------------------------------- */

  const selectAnswer = (answerIndex) => {
    if (submitted) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answerIndex,
    }));
  };

  const score = useMemo(() => {
    if (!activeQuiz) return 0;

    return activeQuiz.questions.reduce((total, question, index) => {
      return total + (answers[index] === question.answer ? 1 : 0);
    }, 0);
  }, [activeQuiz, answers]);

  const percentage = activeQuiz
    ? Math.round((score / activeQuiz.questions.length) * 100)
    : 0;

  const submitQuiz = () => {
    setSubmitted(true);
  };

  const exitQuiz = () => {
    setActiveQuiz(null);
    setAnswers({});
    setCurrentQuestion(0);
    setSubmitted(false);
    setTimeLeft(0);
  };

  const retryQuiz = () => {
    startQuiz(activeQuiz);
  };

  if (activeQuiz) {
    const question = activeQuiz.questions[currentQuestion];

    return (
      <section className="challenge-zone quiz-screen">
        {!submitted ? (
          <div className="quiz-start">
            <div className="quiz-topbar">
              <button className="quiz-back-btn" onClick={exitQuiz}>
                ← Exit Quiz
              </button>
              <div className="quiz-header">
                <h1>{activeQuiz.title}</h1>
              </div>

              <div
                className={`quiz-timer ${
                  timeLeft <= 60 ? "timer-warning" : ""
                }`}
              >
                ⏱ {formatTime(timeLeft)}
              </div>
            </div>

            <div className="quiz-container">
              <div className="quiz-header">
                <h1>{activeQuiz.title}</h1>
              </div>

              {/* Question progress */}
              {/* <div className="question-progress">
                {activeQuiz.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`
                      question-number
                      ${currentQuestion === index ? "active" : ""}
                      ${
                        answers[index] !== undefined
                          ? "answered"
                          : ""
                      }
                    `}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div> */}

              <div className="quiz-question-card">
                <div className="question-label">
                  Question {currentQuestion + 1}
                </div>

                <h2>{question.question}</h2>

                <div className="quiz-options">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      className={`
                        quiz-option
                        ${
                          answers[currentQuestion] === index
                            ? "selected"
                            : ""
                        }
                      `}
                      onClick={() => selectAnswer(index)}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span>{option}</span>

                      {answers[currentQuestion] === index && (
                        <span className="option-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quiz-navigation">
                <button
                  className="secondary-quiz-btn"
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion((previous) => previous - 1)
                  }
                >
                  ← Previous
                </button>

                {currentQuestion <
                activeQuiz.questions.length - 1 ? (
                  <button
                    className="primary-quiz-btn"
                    onClick={() =>
                      setCurrentQuestion(
                        (previous) => previous + 1
                      )
                    }
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    className="submit-quiz-btn"
                    onClick={submitQuiz}
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* -------------------------------------------------
             RESULT SCREEN
          ------------------------------------------------- */

          <div className="quiz-result-container">
            <div>
            <div className="result-icon">
              {percentage >= 70 ? "✓" : "!"}
            </div>

            <p className="result-label">Quiz Completed</p>

            <h1>{activeQuiz.title}</h1>

            <div className="score-circle">
              <strong>{percentage}%</strong>
              <span>Score</span>
            </div>

            <p className="result-score">
              You scored{" "}
              <strong>
                {score} / {activeQuiz.questions.length}
              </strong>
            </p>

            <div className="result-actions">
              <button
                className="secondary-quiz-btn"
                onClick={retryQuiz}
              >
                Try Again
              </button>

              <button
                className="primary-quiz-btn"
                onClick={exitQuiz}
              >
                Back to Challenges
              </button>
            </div>
            </div>
            {/* Answer review */}
            <div className="answer-review">
              <h2>Answer Review</h2>

              {activeQuiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect =
                  userAnswer === question.answer;

                return (
                  <div
                    key={question.id}
                    className={`review-card ${
                      isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    <div className="review-question">
                      <span>
                        {isCorrect ? "✓" : "✕"}
                      </span>

                      <strong>
                        {index + 1}. {question.question}
                      </strong>
                    </div>

                    <p>
                      Your answer:{" "}
                      <strong>
                        {userAnswer !== undefined
                          ? question.options[userAnswer]
                          : "Not answered"}
                      </strong>
                    </p>

                    {!isCorrect && (
                      <p>
                        Correct answer:{" "}
                        <strong>
                          {question.options[question.answer]}
                        </strong>
                      </p>
                    )}

                    <small>{question.explanation}</small>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    );
  }

  /* -------------------------------------------------------
     CHALLENGE ZONE LIST
  ------------------------------------------------------- */

  return (
    
    <section className="page resources-page">
    {/* <section className="challenge-zone"> */}
      <div className="challenge-heading">
        <div>
          <h3 className="page-title">Test Your Knowledge</h3>
          <p>
            Take interactive quizzes and see how much you have
            learned.
          </p>
        </div>

        <div className="challenge-count">
          <strong>{quizData.length}</strong>
          <span>Quizzes</span>
        </div>
      </div>

      <div className="quiz-grid">
        {quizData.map((quiz) => (
          <article className="quiz-card" key={quiz.id}>
            <div className="quiz-card-icon">
              ?
            </div>

            <div className="quiz-card-content">
              <div className="quiz-card-top">
                <span className="quiz-subject">
                  {quiz.subject}
                </span>

                <span
                  className={`difficulty ${quiz.difficulty.toLowerCase()}`}
                >
                  {quiz.difficulty}
                </span>
              </div>

              <h2>{quiz.title}</h2>

              <p>{quiz.description}</p>
              <div className="quiz-card-bottom">
              <div className="quiz-card-meta">
                <span>
                  ⏱ {quiz.duration} min
                </span>

                <span>
                  📝 {quiz.questions.length} Questions
                </span>
              </div>

              <button
                className="start-quiz-btn"
                onClick={() => startQuiz(quiz)}
              >
                Start Quiz
                <span>→</span>
              </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}