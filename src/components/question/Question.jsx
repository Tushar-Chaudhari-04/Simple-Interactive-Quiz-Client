import React, { useState } from "react";
import "./Question.scss";

const Question = ({ indexId,questionId, question, options, onSelect, onNavigate,correctFlag }) => {
  console.log(question, options, onSelect);
  const [btnFlag,setBtnFlag]=useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSelect=(data,indexId,index)=>{
    console.log(btnFlag)
    onSelect(data,indexId,index)
    setBtnFlag(true);
    
  }

  const handleNavigate=(data)=>{
    onNavigate(data) 
    setBtnFlag(false)
    setSelectedOption(null);
  }
  return (
    <div className="question-section">
      <div className="question-content">
        <h2>
          {questionId}.{question}
        </h2>
      </div>
      <div className="question-options">
        <ul>
          {options?.map((data, index) => (
            <div className="option" key={index}>
              <input
                type="radio"
                id={data}
                name="quizOption"
                // value={data}
                onClick={()=>{handleSelect(data,indexId,index)}}
                onChange={()=>{handleOptionChange(data)}}
                checked={selectedOption===data}
              />
              <label className={correctFlag?'correct':'incorrect'} htmlFor={data}>{data}</label>
            </div>
          ))}
        </ul>
      </div>
      {
        btnFlag && (
          <div className="navigate-btn">
          <button className="btn" onClick={() =>handleNavigate("prev")}>
            Previous
          </button>
          <button className="btn" onClick={() =>handleNavigate("next")}>
            Next
          </button>
        </div>
        )
      }
     
    </div>
  );
};

export default Question;
