interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results = ({ score, totalQuestions, onRestart }: ResultsProps) => {
  return (
    <div className="results-container">
      <h2>
        Your Score: {score} / {totalQuestions}
      </h2>
      <button onClick={onRestart} className="restart-button">
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;
