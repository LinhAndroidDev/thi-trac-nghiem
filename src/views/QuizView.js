// Quiz View - MVC Pattern
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, ProgressBar, Alert, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import QuizController from '../controllers/QuizController';

const QuizView = ({ quiz, onBack, onFinish }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSubmitQuiz = useCallback(() => {
    setQuizCompleted(true);
    setShowResults(true);
    
    const timeSpent = Math.round((quiz.timeLimit * 60 - timeRemaining) / 60);
    const result = QuizController.submitQuiz(quiz.id, selectedAnswers, timeSpent);
    
    if (result.success) {
      setQuizResult(result.data);
    }
  }, [quiz, selectedAnswers, timeRemaining]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !quizCompleted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, quizCompleted, handleSubmitQuiz]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex
    });
    
    setShowExplanation({
      ...showExplanation,
      [currentQuestion.id]: true
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestionIndex(index);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Xuất sắc!';
    if (score >= 60) return 'Khá tốt!';
    return 'Cần cố gắng thêm!';
  };

  if (showResults && quizResult) {
    return (
      <div className="p-4">
        <Card className="shadow">
          <Card.Header className="bg-primary text-white text-center">
            <h3 className="mb-0">
              <i className="fas fa-trophy me-2"></i>
              {t('quiz.quizCompleted')}
            </h3>
          </Card.Header>
          <Card.Body className="text-center p-5">
            <div className="mb-4">
              <div className={`display-1 text-${getScoreColor(quizResult.score)} mb-3`}>
                {quizResult.score}%
              </div>
              <h4 className={`text-${getScoreColor(quizResult.score)}`}>
                {getScoreText(quizResult.score)}
              </h4>
            </div>
            
            <Row className="mb-4">
              <Col md={4}>
                <Card className="border-0 bg-light">
                  <Card.Body>
                    <i className="fas fa-question-circle fa-2x text-primary mb-2"></i>
                    <h5>{quizResult.totalQuestions}</h5>
                    <small className="text-muted">{t('quiz.totalQuestions')}</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 bg-light">
                  <Card.Body>
                    <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
                    <h5>{quizResult.correctAnswers}</h5>
                    <small className="text-muted">{t('quiz.correctAnswers')}</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="border-0 bg-light">
                  <Card.Body>
                    <i className="fas fa-clock fa-2x text-info mb-2"></i>
                    <h5>{quizResult.timeSpent}m</h5>
                    <small className="text-muted">{t('quiz.timeSpent')}</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-center gap-3">
              <Button 
                variant="outline-primary" 
                size="lg"
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswers({});
                  setTimeRemaining(quiz.timeLimit * 60);
                  setQuizCompleted(false);
                  setShowExplanation({});
                }}
              >
                <i className="fas fa-redo me-2"></i>
                Làm lại
              </Button>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => onFinish()}
              >
                <i className="fas fa-home me-2"></i>
                Về trang chủ
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Quiz Header */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">{quiz.title}</h4>
              <small>Môn học</small>
            </div>
            <div className="text-end">
              <div className="h5 mb-1">
                <i className="fas fa-clock me-1"></i>
                {formatTime(timeRemaining)}
              </div>
              <small>Thời gian còn lại</small>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span>
              {t('quiz.question')} {currentQuestionIndex + 1} {t('quiz.of')} {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar now={progress} className="mb-3" />
          
          <div className="d-flex justify-content-between">
            <Button 
              variant="outline-secondary" 
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <i className="fas fa-arrow-left me-1"></i>
              {t('common.previous')}
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={onBack}
            >
              <i className="fas fa-times me-1"></i>
              Thoát
            </Button>
            <Button 
              variant="primary" 
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion.id] && currentQuestionIndex < totalQuestions - 1}
            >
              {currentQuestionIndex === totalQuestions - 1 ? t('common.submit') : t('common.next')}
              <i className="fas fa-arrow-right ms-1"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Question */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-4">{currentQuestion.question}</h5>
          
          <div className="mb-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const isExplanationShown = showExplanation[currentQuestion.id];
              
              let variant = 'outline-primary';
              if (isSelected && isExplanationShown) {
                variant = isCorrect ? 'success' : 'danger';
              } else if (isExplanationShown && isCorrect) {
                variant = 'success';
              }

              return (
                <div key={index} className="mb-2">
                  <Button
                    variant={variant}
                    className={`w-100 text-start p-3 ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isExplanationShown}
                  >
                    <div className="d-flex align-items-center">
                      <span className="me-3 fw-bold">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                      {isExplanationShown && isCorrect && (
                        <i className="fas fa-check-circle ms-auto text-white"></i>
                      )}
                      {isExplanationShown && isSelected && !isCorrect && (
                        <i className="fas fa-times-circle ms-auto text-white"></i>
                      )}
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation[currentQuestion.id] && (
            <Alert variant="info" className="mt-3">
              <h6>
                <i className="fas fa-lightbulb me-2"></i>
                {t('quiz.explanation')}:
              </h6>
              <p className="mb-0">{currentQuestion.explanation}</p>
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Question Navigation */}
      <Card className="shadow-sm">
        <Card.Header>
          <h6 className="mb-0">
            <i className="fas fa-list me-2"></i>
            Danh sách câu hỏi
          </h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  index === currentQuestionIndex 
                    ? 'primary' 
                    : selectedAnswers[quiz.questions[index].id] !== undefined
                    ? 'success'
                    : 'outline-secondary'
                }
                size="sm"
                onClick={() => handleQuestionJump(index)}
                className="position-relative"
              >
                {index + 1}
                {selectedAnswers[quiz.questions[index].id] !== undefined && (
                  <i className="fas fa-check position-absolute" 
                     style={{ top: '-5px', right: '-5px', fontSize: '10px' }}></i>
                )}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuizView;
