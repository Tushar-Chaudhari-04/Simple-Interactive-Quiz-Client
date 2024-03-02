import React, { useEffect, useState } from "react";
import "./Result.scss";
import axios from "axios";

const Result = ({ questionData, answers, restartQuiz }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    performAPIForScore();
  }, [answers]);

  const performAPIForScore = async () => {
    await axios
      .post("http://localhost:8081/api/submit", answers)
      .then((data) => {
        console.log("data", data?.data?.score);
        setScore(data?.data?.score);
      })
      .catch((err) => {
        console.log("err in getting question data", err);
      });
  };

  const handleRestart = () => {
    setScore(0);
    restartQuiz();
  };

  return (
    <div className="result-section">
      <h2>Quiz Completed!</h2>
      <h3>Your Score is:{score} </h3>
      <h3>Total Questions Attempted:{answers?.length}</h3>
      <h3>Your Answers:</h3>
      <ol>
        {answers?.map((answer, index) => (
          <li key={index}>{answer?.selectedOption}</li>
        ))}
      </ol>
      <div className="play-btn">
        <button className="btn" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
