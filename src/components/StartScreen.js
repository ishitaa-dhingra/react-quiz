function StartScreen({ numofQuestions, dispatch, selectedNumOfQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <h3>Select the number of questions:</h3>
      <input
        type="range"
        min="1"
        max={numofQuestions}
        value={selectedNumOfQuestions}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value >= 1 && value <= numofQuestions) {
            dispatch({ type: "questions_selected", payload: value });
          }
        }}
      />
      <label for="volume">{selectedNumOfQuestions}</label>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
