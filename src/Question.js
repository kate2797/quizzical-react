import React from "react";

// conditionally render the correct answer

export default function Question(props) {
  const answerElements = props.answers.map((answer) => {
    return (
      <p
        key={answer}
        className={`answer ${answer === props.userAnswer && "selected"}`}
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
