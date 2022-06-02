/*
const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");

*/

import React from "react";
import { useQuery } from "@apollo/client"; // To send data to back end.
import { UPDATE_STAT, QUERY_ME } from "../utils/queries"; // me to get logged in user data, update_stat to update the users stat model once quiz is done.
import { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { fetchQuiz } from "../utils/API";

/*
let correctAnswer = "",
  correctScore = (askedCount = 0),
  totalQuestion = 10;

// event listeners
function eventListeners(){
    _checkBtn.addEventListener('click', checkAnswer);
    _playAgainBtn.addEventListener('click', restartQuiz);
}

document.addEventListener('DOMContentLoaded', function(){
    loadQuestion();
    eventListeners();
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
});


// display question and options
function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(correctAnswer);

    
    _question.innerHTML = `${data.question} <br> <span class = "category"> ${data.category} </span>`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}


// options selection
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

// answer checking
function checkAnswer(){
    _checkBtn.disabled = true;
    if(_options.querySelector('.selected')){
        let selectedAnswer = _options.querySelector('.selected span').textContent;
        if(selectedAnswer == HTMLDecode(correctAnswer)){
            correctScore++;
            _result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
        } else {
            _result.innerHTML = `<p><i class = "fas fa-times"></i>Incorrect Answer!</p> <small><b>Correct Answer: </b>${correctAnswer}</small>`;
        }
        checkCount();
    } else {
        _result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
        _checkBtn.disabled = false;
    }
}

// to convert html entities into normal text of correct answer if there is any
function HTMLDecode(textString) {
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

/*
function checkCount() {
    askedCount++;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(function(){
            console.log("");
        }, 5000);


        _result.innerHTML += `<p>Your score is ${correctScore}.</p>`;
        _playAgainBtn.style.display = "block";
        _checkBtn.style.display = "none";
    } else {
        setTimeout(function(){
            loadQuestion();
        }, 300);
    }
}


function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.style.display = "none";
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}
*/
function TriviaPage() {
  // load question from API
  /*
  async function loadQuestion() {
    const APIUrl = "https://opentdb.com/api.php?amount=10";
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    _result.innerHTML = "";
    showQuestion(data.results[0]);
  }*/

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // const quiz = getQuiz();
  // console.log(quiz);
  async function getQuiz() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const temp = await response.json();

      const quiz = temp.data[0].results;
      // console.log(quiz);
      // console.log(quiz);
      return quiz;
    } catch (err) {
      console.error(err);
    }
  }

  const quiz = getQuiz();
  console.log(quiz);

  /*
  useEffect(() => {
    console.log("triggered api call");
    fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        }
      );
  }, []);*/

  const questions = items; // save the array of api questions to be passed as a prop.
  return (
    <div>
      <Quiz questions={getQuiz()} />
    </div>
  );
}

export default TriviaPage;
