function ProgressBar({
  index,
  numofQuestions,
  maxPossiblePoints,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numofQuestions} value={index + Number(answer !== null)} />
      <p>
        Question : <strong>{index}</strong>/{numofQuestions}
      </p>
      <p>
        {" "}
        <strong>{points}</strong>/{maxPossiblePoints}{" "}
      </p>
    </header>
  );
}

export default ProgressBar;
