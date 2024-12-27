import { useEffect, useState } from "react";
import { DB, Question } from "../data-providers/Server";
import QuestionComponent from "../components/trivia/Question";
import Navigation from "../components/trivia/Navigation";
import Results from "../components/trivia/Results";
import Loader from "../components/Loader";

const Trivia = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    DB.getQuestions().then((fetchedQuestions) => setQuestions(fetchedQuestions));
  }, []);

  const handleAnswerChange = (answer: string) => {
    const questionId = questions[currentQuestionIndex]?.id;
    if (questionId !== undefined) {
      setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleNext = () => setCurrentQuestionIndex((prev) => prev + 1);
  const handlePrevious = () => setCurrentQuestionIndex((prev) => prev - 1);

  const handleSubmit = () => {
    const totalScore = questions.reduce(
      (acc, question) => (selectedAnswers[question.id] === question.correctAnswer ? acc + 1 : acc),
      0
    );
    setScore(totalScore);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
  };

  if (questions.length === 0) {
    return <Loader />;
  }

  return (
    <div className="trivia-container">
      <h1>Trivia Quiz</h1>
      {score !== null ? (
        <Results score={score} totalQuestions={questions.length} onRestart={handleRestart} />
      ) : (
        <>
          <QuestionComponent
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedAnswer={selectedAnswers[questions[currentQuestionIndex]?.id]}
            onAnswerChange={handleAnswerChange}
          />
          <Navigation
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isAnswerSelected={!!selectedAnswers[questions[currentQuestionIndex]?.id]}
          />
        </>
      )}
    </div>
  );
};

export default Trivia;
