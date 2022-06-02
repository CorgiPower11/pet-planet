import React, { useState } from "react";

function Quiz(questions) {
  const [activeQuestion, setActiveQuestion] = useState(0); // set activeQuestion to index zero
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  //const temp = res.json(questions);

  // combine answers into one interable array
  let answers = questions[activeQuestion.incorrect_answers];
  answers.push(activeQuestion.correct_answer);
  console.log(answers);
  answers = answers.sort(() => Math.random() - 0.5); // shuffle array
  // function to shuffle the array
  console.log(answers);

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1); // increment score if correct
    }

    const nextQuestion = activeQuestion + 1; // increment to next array index

    if (nextQuestion < questions.length) {
      answers = questions[activeQuestion.incorrect_answers]; // assemble and shuffle answers array for the new question
      answers.push(activeQuestion.correct_answer);
      answers = answers.sort(() => Math.random() - 0.5);
      // check to verify question remain
      setActiveQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div>
      {showScore ? (
        <div>
          You earned {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div>
            <div>
              <span>Question {activeQuestion + 1}</span> of {questions.length}
            </div>
            <div>{questions[activeQuestion].question}</div>
          </div>
          <div>
            {answers.map((option) => (
              <button onClick={() => handleAnswerSubmit(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
