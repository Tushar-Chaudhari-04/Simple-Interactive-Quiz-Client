import React, { useState } from "react";
import "./Quiz.scss";
import Question from "../question/Question";
import Result from "../result/Result";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const Quiz = () => {
  // const questionData = [
  //   {
  //     questionId: 1,
  //     question: "What is the capital of France?",
  //     options: ["Paris", "Berlin", "London", "Madrid"],
  //     correctAnswer: "Paris",
  //   },
  //   {
  //     questionId: 2,
  //     question: "Who wrote 'To Kill a Mockingbird'?",
  //     options: [
  //       "Harper Lee",
  //       "Jane Austen",
  //       "F. Scott Fitzgerald",
  //       "Ernest Hemingway",
  //     ],
  //     correctAnswer: "Harper Lee",
  //   },
  //   {
  //     questionId: 3,
  //     question: "Which planet is known as the Red Planet?",
  //     options: ["Earth", "Mars", "Venus", "Jupiter"],
  //     correctAnswer: "Mars",
  //   },
  // ];

  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const [correctFlag,setCorrectFlag]=useState(false);
  // const [score, setScore] = useState(0);

  // useEffect(() => {
  //   calculateScore();
  // }, [userResponses])

  useEffect(() => {
    performAPICall();
  }, []);

  const performAPICall = async () => {
    await axios
      .get("http://localhost:8081/api/quiz")
      .then((data) => {
        console.log("data", data?.data?.questions);
        setQuestionData(data?.data?.questions);
      })
      .catch((err) => {
        console.log("err in getting question data", err);
      });
  };
  const handleSelectedOption = (selectedOption, indexId, questionIndex) => {
    // message.info("Checking Anwer...")
    console.log(selectedOption, indexId, questionIndex);
    setAnswers((prevResponses) => {
      const updatedResponses = [...prevResponses];
      updatedResponses[questionIndex] = {
        questionId: indexId,
        selectedOption: selectedOption,
      };
      return updatedResponses;
    });

    checkOption(selectedOption, indexId, questionIndex);
  };

  const checkOption = (selectedOption, indexId, questionIndex) => {
    if (questionData[questionIndex].correctAnswer != selectedOption) {
      setCorrectFlag(false)
      //message.error(selectedOption+" is Wrong Answer",1.5);
      message.info(
        "Correct Answer is " + questionData[questionIndex].correctAnswer,1.5
      );
    } else {
      setCorrectFlag(true)
      message.success("Correct Answer",1.5);
    }
  };

  const handleNavigate = (navigateData, questionIndex) => {
    console.log("navigateData", navigateData);

    if (navigateData == "prev" && questionIndex > 0) {
      setCurrentQuestion(questionIndex - 1);
    } else if (navigateData == "next") {
      setCurrentQuestion(questionIndex + 1);
    }
  };

  const restartQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    navigate("/");
  };

  console.log("userResponses in Quiz", answers);
  return (
    <div className="quiz-section">
      {currentQuestion < questionData.length ? (
        <Question
          indexId={questionData[currentQuestion]._id}
          questionId={currentQuestion + 1}
          question={questionData[currentQuestion].text}
          options={questionData[currentQuestion].options}
          onSelect={(option, indexId) =>
            handleSelectedOption(option, indexId, currentQuestion)
          }
          onNavigate={(navigateData) =>
            handleNavigate(navigateData, currentQuestion)
          }
          correctFlag={correctFlag}
        />
      ) : (
        <Result
          questionData={questionData}
          answers={answers}
          restartQuiz={restartQuiz}
        />
      )}
    </div>
  );
};

export default Quiz;
