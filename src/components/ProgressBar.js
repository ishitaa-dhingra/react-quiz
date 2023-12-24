function ProgressBar({
  index,
  selectedNumOfQuestions,
  maxPossiblePoints,
  points,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={selectedNumOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question : <strong>{index}</strong>/{selectedNumOfQuestions}
      </p>
      <p>
        {" "}
        <strong>{points}</strong>/{maxPossiblePoints}{" "}
      </p>
    </header>
  );
}

export default ProgressBar;
