function StartScreen({ numofQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numofQuestions} questions to test Your React Mastery</h3>
      <button className="btn-btn-ui">Let's Start</button>
    </div>
  );
}

export default StartScreen;
