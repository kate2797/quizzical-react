import React from "react";
import SplashScreen from "./components/SplashScreen";
import Quiz from "./components/Quiz";

export default function App() {
  const [hasStarted, setHasStarted] = React.useState(false); // state to handle SplashScreen

  /**
   * flips the state, so that we now render the correct component i.e., SplashScreen or Quiz
   */
  function startQuiz() {
    setHasStarted(true);
  }

  return (
    <>
      <main>
        {hasStarted ? (
          <Quiz setHasStarted={setHasStarted} />
        ) : (
          <SplashScreen startQuiz={startQuiz} />
        )}
      </main>
    </>
  );
}
