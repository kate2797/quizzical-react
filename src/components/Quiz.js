/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { decode } from "he";

import Question from "./Question";

export default function Quiz({ setHasStarted }) {
  const [questionData, setQuestionData] = React.useState([]);
  const [score, setScore] = React.useState(0); // number of answers they got correct
  const [gameOver, setGameOver] = React.useState(false);

  const noQuestions = 5;
  const allLoaded = questionData.length === noQuestions; // only render a component after all API data has loaded

  /**
   * resets all state
   */
  function startOver() {
    setHasStarted(false);
    setQuestionData([]);
    setScore(0);
    setGameOver(false);
  }

  /**
   * updates the score everytime the the array changes (user may have guessed correctly...)
   */
  React.useEffect(() => {
    setScore(computeScore()); // update score
  }, [questionData]);

  /**
   * computes current score
   */
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
    fetch(`https://opentdb.com/api.php?amount=${noQuestions}&type=multiple`)
      .then((res) => res.json())
      .then((res) =>
        setQuestionData(() => {
          let index = 0;
          return res.results.map((data) => {
            return {
              id: index++,
              question: decode(data.question),
              answers: [...data.incorrect_answers, data.correct_answer]
                .sort(
                  () => Math.random() - 0.5 // shuffled answers
                )
                .map((answer) => {
                  return decode(answer);
                }),
              correctAnswer: decode(data.correct_answer),
              userAnswer: "",
              isRevealed: false, // needed for styling (false by default)
              isCorrectGuess: false,
            };
          });
        })
      );
  }, []); // I want to make the API call just once

  /**
   * handles selecting an answer
   */
  function selectAnswer(questionId, answer) {
    // get that question, update its userAnswer property
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

  /**
   * handles checking all answers for correctness at the end of the quiz
   */
  function checkAllAnswers() {
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

  /**
   * turns an array of objects into an array of JSX elements
   */
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

  /**
   * button JSX elements
   */
  const playAgain = <button onClick={startOver}>Play Again</button>;

  const checkAnswers = <button onClick={checkAllAnswers}>Check Answers</button>;

  return (
    <>
      <div className='quiz'>
        <div>{questionElements}</div>
        <div className='score'>
          {gameOver && (
            <h3>
              You scored {score}/{questionData.length} correct answers
            </h3>
          )}
          {allLoaded && gameOver ? playAgain : checkAnswers}
        </div>
      </div>
    </>
  );
}
