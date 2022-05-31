import React from "react";

export default function Question(props) {
  /**
   * turns all answers into <p> JSX elements
   */
  const answerElements = props.answers.map((answer) => {
    // dynamic CSS styling
    const selected = answer === props.userAnswer && "selected";
    const correct =
      answer === props.correctAnswer && props.isRevealed && "correct";
    const incorrect =
      answer !== props.correctAnswer &&
      answer === props.userAnswer &&
      props.isRevealed &&
      "incorrect";
    const revealed =
      props.isRevealed &&
      answer !== props.correctAnswer &&
      answer !== props.userAnswer &&
      "revealed";

    return (
      <button
        key={answer}
        className={`answer ${selected} ${correct} ${incorrect} ${revealed}`}
        onClick={() => props.selectAnswer(props.id, answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <section>
      <h2 className="question">{props.question}</h2>
      <div className='answers'>{answerElements}</div>
      <hr class="solid"></hr>
    </section>
  );
}
