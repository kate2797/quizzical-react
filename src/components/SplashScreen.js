import React from "react";

export default function SplashScreen(props) {
  return (
    <section className="splashscreen">
      <div>
        <h1>Quizzical</h1>
        <p>Some description if needed</p>
        <button className='button-main' onClick={props.startQuiz}>
          Start Quiz
        </button>
      </div>
    </section>
  );
}
