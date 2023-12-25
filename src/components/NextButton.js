function NextButton({
  dispatch,
  answer,
  index,
  selectedNumOfQuestions,
  status,
}) {
  if (answer === null && status !== "verify") return null;

  if (index < selectedNumOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finish
    </button>
  );
}

export default NextButton;
