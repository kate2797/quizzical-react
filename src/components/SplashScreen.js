import React from "react";

export default function SplashScreen(props) {
  return (
    <section className='splashscreen'>
      <div className='splashscreen-container'>
        <h1>Quizzical</h1>
        <p>Can you get all of them right?</p>
        <button onClick={props.startQuiz}>Start Quiz</button>
      </div>
    </section>
  );
}
