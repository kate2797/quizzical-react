/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Question from "../Question";

export default function Quiz() {
  const [questionData, setQuestionData] = React.useState([]);
  const [score, setScore] = React.useState(0); // number of answers they got correct

  // this component will display the score etc.

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
              isRevealed: false, // needed for styling
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
      <button className='button-main'>Check Answers</button>
    </>
  );
}
