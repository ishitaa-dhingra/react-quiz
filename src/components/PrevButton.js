function PrevButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui prev-btn"
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Previous
    </button>
  );
}

export default PrevButton;
