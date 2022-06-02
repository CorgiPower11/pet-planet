export const fetchQuiz = () => {
  return fetch(`https://opentdb.com/api.php?amount=10`);
};
