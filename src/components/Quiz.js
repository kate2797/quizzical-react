/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Question from "../Question";

export default function Quiz() {
  const [questionData, setQuestionData] = React.useState([]);
  const [score, setScore] = React.useState(0); // number of answers they got correct
  const [gameOver, setGameOver] = React.useState(false);

  // everytime the the array changes, update score (may have guessed correctly...)
  React.useEffect(() => {
    setScore(computeScore()); // update score
  }, [questionData]);

  function computeScore() {
    let score = 0;
    questionData.forEach((question) => {
      if (question.isCorrectGuess) {
        score++;
      }
    });
    return score;
  }

  /**
   * gets data from the API and transforms them into an array of objects
   */
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((res) =>
        setQuestionData(() => {
          let index = 0;
          return res.results.map((data) => {
            return {
              id: index++,
              question: data.question,
              answers: [...data.incorrect_answers, data.correct_answer].sort(
                () => Math.random() - 0.5 // shuffled answers
              ),
              correctAnswer: data.correct_answer,
              userAnswer: "",
              isRevealed: false, // needed for styling (false by default)
              isCorrectGuess: false,
            };
          });
        })
      );
  }, []); // I want to make the API call just once

  function selectAnswer(questionId, answer) {
    // get that question, update its property
    console.log(questionId);
    console.log(answer);

    setQuestionData((prevData) => {
      return prevData.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            userAnswer: answer,
          };
        } else {
          return question; // must specify the unmodified version too
        }
      });
    });
  }

  console.log(questionData);

  function checkAnswer() {
    // turn all to revealed, perfom checks
    setQuestionData((prevData) => {
      return prevData.map((question) => {
        if (question.userAnswer === question.correctAnswer) {
          return {
            ...question,
            isRevealed: true,
            isCorrectGuess: true,
          };
        } else {
          return {
            ...question,
            isRevealed: true,
          };
        }
      });
    });
    setGameOver(true); // update, the game has ended
  }

  const questionElements = questionData.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        question={question.question}
        answers={question.answers}
        correctAnswer={question.correctAnswer}
        userAnswer={question.userAnswer}
        isRevealed={question.isRevealed}
        selectAnswer={selectAnswer}
      />
    );
  });

  return (
    <>
      <div className='quiz'>
        <div>{questionElements}</div>
      </div>
      {gameOver && (
        <p>
          You scored {score}/{questionData.length} correct answers
        </p>
      )}
      <button className='button-main' onClick={checkAnswer}>
        {gameOver ? "Play Again" : "Check Answers"}
      </button>
    </>
  );
}
