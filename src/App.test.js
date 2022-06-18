import React from "react";
import { mount, shallow } from "enzyme";

import App from "./App";
import SplashScreen from "./components/SplashScreen";
import Quiz from "./components/Quiz";
import toJson from "enzyme-to-json";

// setup
const setHasStarted = true;

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
describe("test passing props", () => {
  const quizWrapper = mount(<Quiz setHasStarted={setHasStarted} />);

  it("accepts function props", () => {
    expect(quizWrapper.props().setHasStarted).toEqual(setHasStarted);
  });
});

/**
 * test suite 3 - logic (unit tests)
 */
// left out - no complicated logic lives in App

/**
 * test suite 4 - snapshots (regression tests)
 */
describe("test snapshots", () => {
  it("App snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
});
