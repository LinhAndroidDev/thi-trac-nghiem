import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Modal, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { quizzes, subjects } from '../data/sampleData';

const History = () => {
  const { t } = useTranslation();
  const { state } = useApp();
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Get quiz history with quiz details
    const historyWithDetails = state.quizHistory.map(historyItem => {
      const quiz = quizzes.find(q => q.id === historyItem.quizId);
      const subject = subjects.find(s => s.id === quiz?.subjectId);
      return {
        ...historyItem,
        quizTitle: quiz?.title,
        subjectName: subject?.name,
        subjectColor: subject?.color,
        quiz: quiz
      };
    });
    setHistory(historyWithDetails);
  }, [state.quizHistory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Xuất sắc';
    if (score >= 60) return 'Khá tốt';
    return 'Cần cố gắng';
  };

  const handleViewDetails = (historyItem) => {
    setSelectedQuiz(historyItem);
    setShowDetails(true);
  };

  const getAnswerStatus = (question, userAnswer) => {
    const isCorrect = userAnswer.isCorrect;
    const correctAnswer = question.correctAnswer;
    const userAnswerIndex = userAnswer.selectedAnswer;
    
    return {
      isCorrect,
      userAnswer: question.options[userAnswerIndex],
      correctAnswer: question.options[correctAnswer],
      explanation: question.explanation
    };
  };

  if (!state.isAuthenticated) {
    return (
      <div className="p-4">
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-lock fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Cần đăng nhập</h4>
            <p className="text-muted">
              Bạn cần đăng nhập để xem lịch sử bài thi và thống kê.
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-primary">
          <i className="fas fa-history me-2"></i>
          {t('history.title')}
        </h2>
        <p className="text-muted">Xem lại các bài thi đã làm</p>
      </div>

      {history.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">{t('history.noHistory')}</h4>
            <p className="text-muted">Bạn chưa có lịch sử bài thi nào. Hãy bắt đầu làm bài thi!</p>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Header>
            <h5 className="mb-0">
              <i className="fas fa-list me-2"></i>
              Danh sách bài thi đã làm ({history.length})
            </h5>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Bài thi</th>
                  <th>Chủ đề</th>
                  <th>Điểm số</th>
                  <th>Thời gian</th>
                  <th>Ngày thi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <strong>{item.quizTitle}</strong>
                        <br />
                        <small className="text-muted">
                          {item.correctAnswers}/{item.totalQuestions} câu đúng
                        </small>
                      </div>
                    </td>
                    <td>
                      <Badge 
                        style={{ backgroundColor: item.subjectColor }}
                        className="text-white"
                      >
                        {item.subjectName}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Badge bg={getScoreColor(item.score)} className="me-2">
                          {item.score}%
                        </Badge>
                        <small className="text-muted">
                          {getScoreText(item.score)}
                        </small>
                      </div>
                    </td>
                    <td>
                      <i className="fas fa-clock me-1 text-muted"></i>
                      {formatTime(item.timeSpent)}
                    </td>
                    <td>
                      <small>{formatDate(item.completedAt)}</small>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleViewDetails(item)}
                      >
                        <i className="fas fa-eye me-1"></i>
                        {t('history.viewDetails')}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Quiz Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-eye me-2"></i>
            Chi tiết bài thi: {selectedQuiz?.quizTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedQuiz && (
            <div>
              {/* Quiz Summary */}
              <Row className="mb-4">
                <Col md={3}>
                  <Card className="text-center border-0 bg-light">
                    <Card.Body>
                      <i className="fas fa-percentage fa-2x text-primary mb-2"></i>
                      <h4>{selectedQuiz.score}%</h4>
                      <small className="text-muted">Điểm số</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center border-0 bg-light">
                    <Card.Body>
                      <i className="fas fa-check-circle fa-2x text-success mb-2"></i>
                      <h4>{selectedQuiz.correctAnswers}</h4>
                      <small className="text-muted">Câu đúng</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center border-0 bg-light">
                    <Card.Body>
                      <i className="fas fa-times-circle fa-2x text-danger mb-2"></i>
                      <h4>{selectedQuiz.totalQuestions - selectedQuiz.correctAnswers}</h4>
                      <small className="text-muted">Câu sai</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center border-0 bg-light">
                    <Card.Body>
                      <i className="fas fa-clock fa-2x text-info mb-2"></i>
                      <h4>{formatTime(selectedQuiz.timeSpent)}</h4>
                      <small className="text-muted">Thời gian</small>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Question Details */}
              <h5 className="mb-3">Chi tiết từng câu hỏi:</h5>
              {selectedQuiz.quiz?.questions.map((question, index) => {
                const userAnswer = selectedQuiz.answers.find(a => a.questionId === question.id);
                const answerStatus = getAnswerStatus(question, userAnswer);
                
                return (
                  <Card key={question.id} className="mb-3">
                    <Card.Header className={`bg-${answerStatus.isCorrect ? 'success' : 'danger'} text-white`}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Câu {index + 1}</h6>
                        <Badge bg="light" text={answerStatus.isCorrect ? 'success' : 'danger'}>
                          {answerStatus.isCorrect ? 'Đúng' : 'Sai'}
                        </Badge>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <p className="fw-bold mb-3">{question.question}</p>
                      
                      <div className="mb-3">
                        <h6 className="text-success">
                          <i className="fas fa-check me-1"></i>
                          Đáp án đúng:
                        </h6>
                        <p className="text-success">{answerStatus.correctAnswer}</p>
                      </div>

                      <div className="mb-3">
                        <h6 className={answerStatus.isCorrect ? 'text-success' : 'text-danger'}>
                          <i className="fas fa-user me-1"></i>
                          Đáp án của bạn:
                        </h6>
                        <p className={answerStatus.isCorrect ? 'text-success' : 'text-danger'}>
                          {answerStatus.userAnswer}
                        </p>
                      </div>

                      <div>
                        <h6 className="text-info">
                          <i className="fas fa-lightbulb me-1"></i>
                          Giải thích:
                        </h6>
                        <p className="text-muted">{answerStatus.explanation}</p>
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            {t('common.close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default History;
