import { useState } from "react";
import "./App.css";
import Question from "./components/question/Question";
import Quiz from "./components/quiz/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app-section">
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
