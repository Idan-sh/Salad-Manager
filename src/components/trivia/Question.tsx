import { Question } from "../../data-providers/Server";

interface QuestionComponentProps {
  question: Question | undefined;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerChange: (answer: string) => void;
}

const QuestionComponent = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerChange
}: QuestionComponentProps) => {
  if (!question) return null;

  return (
    <div className="question-container">
      <h3>
        Question {currentIndex + 1} of {totalQuestions}
      </h3>
      <p>{question.question}</p>
      <div className="options-container">
        {question.options.map((option) => (
          <label key={option} className="option">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
