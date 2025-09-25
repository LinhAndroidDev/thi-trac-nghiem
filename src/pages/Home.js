import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';
import { subjects, quizzes } from '../data/sampleData';

const Home = ({ setActiveTab, setCurrentQuiz }) => {
  const { t } = useTranslation();
  const { state } = useApp();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectQuizzes, setSubjectQuizzes] = useState([]);
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    // Get recent quizzes from history
    if (state.quizHistory && state.quizHistory.length > 0) {
      const recent = state.quizHistory.slice(0, 5).map(history => {
        const quiz = quizzes.find(q => q.id === history.quizId);
        return {
          ...history,
          quizTitle: quiz?.title,
          subjectName: subjects.find(s => s.id === quiz?.subjectId)?.name
        };
      });
      setRecentQuizzes(recent);
    }
  }, [state.quizHistory]);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    const subjectQuizList = quizzes.filter(quiz => quiz.subjectId === subject.id);
    setSubjectQuizzes(subjectQuizList);
  };

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setActiveTab('quiz');
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-primary">
          <i className="fas fa-home me-2"></i>
          {t('home.title')}
        </h2>
        <p className="text-muted">Chọn chủ đề và bắt đầu làm bài thi trắc nghiệm</p>
      </div>

      {/* Subjects Section */}
      <div className="mb-5">
        <h4 className="mb-3">
          <i className="fas fa-book me-2"></i>
          {t('home.subjects')}
        </h4>
        <Row>
          {subjects.map((subject) => (
            <Col key={subject.id} md={6} lg={4} className="mb-3">
              <Card 
                className="h-100 shadow-sm cursor-pointer"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSubjectClick(subject)}
              >
                <Card.Body>
                  <div className="d-flex align-items-center mb-2">
                    <div 
                      className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: subject.color,
                        color: 'white'
                      }}
                    >
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <div>
                      <Card.Title className="mb-1">{subject.name}</Card.Title>
                      <small className="text-muted">{subject.description}</small>
                    </div>
                  </div>
                  <Badge bg="secondary" className="mt-2">
                    {quizzes.filter(q => q.subjectId === subject.id).length} bài thi
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Selected Subject Quizzes */}
      {selectedSubject && (
        <div className="mb-5">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h4>
              <i className="fas fa-list me-2"></i>
              Bài thi môn {selectedSubject.name}
            </h4>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => setSelectedSubject(null)}
            >
              <i className="fas fa-times me-1"></i>
              Đóng
            </Button>
          </div>
          <Row>
            {subjectQuizzes.map((quiz) => (
              <Col key={quiz.id} md={6} lg={4} className="mb-3">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>
                    <Card.Text className="text-muted">{quiz.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        <i className="fas fa-clock me-1"></i>
                        {quiz.timeLimit} phút
                      </small>
                      <small className="text-muted">
                        <i className="fas fa-question-circle me-1"></i>
                        {quiz.questions.length} câu
                      </small>
                    </div>
                    <Button 
                      variant="primary" 
                      className="w-100 mt-3"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      <i className="fas fa-play me-1"></i>
                      {t('home.startQuiz')}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Recent Quizzes Section */}
      {state.isAuthenticated && (
        <div className="mb-4">
          <h4 className="mb-3">
            <i className="fas fa-history me-2"></i>
            {t('home.recentQuizzes')}
          </h4>
          {recentQuizzes.length > 0 ? (
            <Row>
              {recentQuizzes.map((quiz) => (
                <Col key={quiz.id} md={6} lg={4} className="mb-3">
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Card.Title className="mb-1">{quiz.quizTitle}</Card.Title>
                        <Badge bg={quiz.score >= 80 ? 'success' : quiz.score >= 60 ? 'warning' : 'danger'}>
                          {quiz.score}%
                        </Badge>
                      </div>
                      <Card.Text className="text-muted mb-2">
                        <small>
                          <i className="fas fa-book me-1"></i>
                          {quiz.subjectName}
                        </small>
                      </Card.Text>
                      <div className="d-flex justify-content-between text-muted small mb-3">
                        <span>
                          <i className="fas fa-clock me-1"></i>
                          {formatTime(quiz.timeSpent)}
                        </span>
                        <span>
                          <i className="fas fa-calendar me-1"></i>
                          {formatDate(quiz.completedAt)}
                        </span>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => {
                          // Navigate to quiz review
                          setActiveTab('history');
                        }}
                      >
                        <i className="fas fa-eye me-1"></i>
                        Xem lại
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="text-center py-5">
              <Card.Body>
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 className="text-muted">{t('home.noRecentQuizzes')}</h5>
                <p className="text-muted">Bắt đầu làm bài thi để xem lịch sử ở đây</p>
              </Card.Body>
            </Card>
          )}
        </div>
      )}

      {/* Guest User Message */}
      {!state.isAuthenticated && (
        <Card className="bg-info text-white">
          <Card.Body className="text-center">
            <i className="fas fa-info-circle fa-2x mb-3"></i>
            <h5>Làm bài thi mà không cần đăng nhập</h5>
            <p className="mb-0">
              Bạn có thể làm bài thi ngay bây giờ, nhưng để lưu lịch sử và thống kê, 
              hãy đăng nhập hoặc đăng ký tài khoản.
            </p>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Home;
