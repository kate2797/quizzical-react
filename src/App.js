import React from "react";
import SplashScreen from "./components/SplashScreen";
import Quiz from "./components/Quiz";

/**
 * Starting the quiz pulls questions from the API
 * Conditionally render the next section
 */

export default function App() {
  const [hasStarted, setHasStarted] = React.useState(false); // state to handle SplashScreen

  /**
   * flips the state, so that we now render the correct component (Quiz)
   */
  function startQuiz() {
    setHasStarted(true);
  }

  return (
    <main>
      {!hasStarted && <SplashScreen startQuiz={startQuiz} />}
      {hasStarted && <Quiz />}
    </main>
  );
}
