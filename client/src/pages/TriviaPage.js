
import React from "react";
import Quiz from "../components/Quiz/Quiz";

function TriviaPage() {

  const questions = items; // save the array of api questions to be passed as a prop.
  return (
    <div>
      <Quiz />
    </div>
  );
}

export default TriviaPage;
