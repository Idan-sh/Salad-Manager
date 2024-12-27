interface NavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isAnswerSelected: boolean;
}

const Navigation = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  isAnswerSelected
}: NavigationProps) => {
  return (
    <div className="navigation-container">
      <button
        onClick={onPrevious}
        className="nav-button"
        style={{ visibility: currentIndex === 0 ? "hidden" : "visible" }}
      >
        Previous
      </button>

      {currentIndex < totalQuestions - 1 ? (
        <button onClick={onNext} disabled={!isAnswerSelected} className="nav-button">
          Next
        </button>
      ) : (
        <button
          onClick={onSubmit}
          className="nav-button submit-button"
          disabled={!isAnswerSelected}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Navigation;
