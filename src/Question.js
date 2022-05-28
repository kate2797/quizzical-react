import React from "react";

export default function Question({
  question,
  correctAnswer,
  answers,
  userAnswer,
}) {
  const answerElements = answers.map((answer) => {
    return <p className='answer correct'>{answer}</p>;
  });

  return (
    <section>
      <h2>{question}</h2>
      <div className='answers'>{answerElements}</div>
    </section>
  );
}
