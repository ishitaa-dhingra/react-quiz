import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;
  const { width, height } = useWindowSize();
  let emoji;
  let confetti = null;

  if (percentage === 100) {
    emoji = "🥇";
    confetti = <Confetti width={width} height={height} />;
  }
  if (percentage >= 80 && percentage < 100) emoji = "🙂";
  if (percentage >= 50 && percentage < 80) emoji = "🫠";
  if (percentage >= 0 && percentage < 50) emoji = "🙃";
  if (percentage === 0) emoji = "😥";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>

      <button
        className="btn btn-ui-sa"
        onClick={() => dispatch({ type: "seeAnswers" })}
      >
        See answers
      </button>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
      {confetti}
    </>
  );
}

export default FinishScreen;
