import React from "react";

// conditionally render the correct answer

export default function Question(props) {
  // turn selected to incorrect if it is

  const answerElements = props.answers.map((answer) => {
    //const selected = answer === props.userAnswer && "selected";
    // store these like this

    return (
      <p
        key={answer}
        className={`answer ${answer === props.userAnswer && "selected"} ${
          answer === props.correctAnswer && props.isRevealed && "correct"
        } ${
          answer !== props.correctAnswer &&
          answer === props.userAnswer &&
          props.isRevealed &&
          "incorrect"
        }
        ${props.isRevealed && answer !== props.correctAnswer && answer !== props.userAnswer && "revealed"}
        `}
        onClick={() => props.selectAnswer(props.id, answer)}
      >
        {answer}
      </p>
    );
  });

  return (
    <section>
      <h2>{props.question}</h2>
      <div className='answers'>{answerElements}</div>
    </section>
  );
}
