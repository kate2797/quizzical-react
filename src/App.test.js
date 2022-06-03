import React from "react";
import { shallow } from "enzyme";

import App from "./App";
import SplashScreen from "./components/SplashScreen";
import Quiz from "./components/Quiz";

/**
 * test suite 1 - rendering (regression tests)
 */
describe("test rendering of components", () => {
  it("renders App component without crashing", () => {
    shallow(<App />);
  });

  it("renders SplashScreen component without crashing", () => {
    shallow(<SplashScreen />);
  });

  it("renders Quiz component without crashing", () => {
    shallow(<Quiz />);
  });
});

/**
 * test suite 2 - passing props (unit tests: individual componets or pure functions)
 */
// todo

/**
 * test suite 3 - logic (unit tests)
 */
// todo

/**
 * test suite 4 - snapshots (regression tests)
 */
// todo
