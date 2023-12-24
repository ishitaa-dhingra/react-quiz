import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import PrevButton from "./PrevButton";

const SECS_PER_QUESTION = 30;
const initialState = {
  questions: [],
  answers: [],
  // "loading"."error",ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  selectedNumOfQuestions: 5,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "questions_selected":
      return {
        ...state,
        selectedNumOfQuestions: action.payload,
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.selectedNumOfQuestions * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.questions[state.index];
      state.answers.push(action.payload);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "prevQuestion":
      return {
        ...state,
        index: state.index > 0 ? state.index - 1 : 0,
        answer: state.index > 0 ? state.answers[state.index - 1] : state.answer,
      };

    default:
      throw new Error("Action is unknown");
  }
}
function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      selectedNumOfQuestions,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [theme, setTheme] = useState("dark");
  const numofQuestions = questions.length;
  const maxPossiblePoints = questions
    .slice(0, selectedNumOfQuestions)
    .reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numofQuestions={numofQuestions}
            dispatch={dispatch}
            selectedNumOfQuestions={selectedNumOfQuestions}
          />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index}
              selectedNumOfQuestions={selectedNumOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer className="footer">
              <PrevButton dispatch={dispatch} />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                selectedNumOfQuestions={selectedNumOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
