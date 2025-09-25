// Statistics View - MVC Pattern
import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import QuizController from '../controllers/QuizController';
import AuthController from '../controllers/AuthController';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const StatisticsView = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    totalTime: 0,
    quizzesBySubject: [],
    monthlyProgress: [],
    answersBySubject: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const statistics = QuizController.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Chart configurations
  const quizzesBySubjectConfig = {
    labels: stats.quizzesBySubject.map(item => item.subject),
    datasets: [
      {
        label: 'Số lượng bài thi',
        data: stats.quizzesBySubject.map(item => item.count),
        backgroundColor: stats.quizzesBySubject.map(item => item.color),
        borderColor: stats.quizzesBySubject.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const answersBySubjectConfig = {
    labels: stats.answersBySubject.map(item => item.subject),
    datasets: [
      {
        label: 'Câu đúng',
        data: stats.answersBySubject.map(item => item.correct),
        backgroundColor: stats.answersBySubject.map(item => item.color),
        borderColor: stats.answersBySubject.map(item => item.color),
        borderWidth: 1,
      },
      {
        label: 'Câu sai',
        data: stats.answersBySubject.map(item => item.incorrect),
        backgroundColor: stats.answersBySubject.map(item => item.color + '80'),
        borderColor: stats.answersBySubject.map(item => item.color),
        borderWidth: 1,
      },
    ],
  };

  const monthlyProgressConfig = {
    labels: stats.monthlyProgress.map(item => item.month),
    datasets: [
      {
        label: 'Câu đúng',
        data: stats.monthlyProgress.map(item => item.correct),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
      {
        label: 'Câu sai',
        data: stats.monthlyProgress.map(item => item.incorrect),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê bài thi'
      },
    },
  };

  if (!AuthController.isAuthenticated()) {
    return (
      <div className="p-4">
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-lock fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Cần đăng nhập</h4>
            <p className="text-muted">
              Bạn cần đăng nhập để xem thống kê và biểu đồ.
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (stats.totalQuizzes === 0) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-primary">
            <i className="fas fa-chart-bar me-2"></i>
            {t('statistics.title')}
          </h2>
          <p className="text-muted">Thống kê và biểu đồ về kết quả học tập</p>
        </div>
        
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-chart-line fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Chưa có dữ liệu thống kê</h4>
            <p className="text-muted">Hãy làm một số bài thi để xem thống kê ở đây!</p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-primary">
          <i className="fas fa-chart-bar me-2"></i>
          {t('statistics.title')}
        </h2>
        <p className="text-muted">Thống kê và biểu đồ về kết quả học tập</p>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center border-0 bg-primary text-white">
            <Card.Body>
              <i className="fas fa-trophy fa-2x mb-2"></i>
              <h3>{stats.totalQuizzes}</h3>
              <small>{t('statistics.totalQuizzes')}</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 bg-success text-white">
            <Card.Body>
              <i className="fas fa-percentage fa-2x mb-2"></i>
              <h3>{stats.averageScore}%</h3>
              <small>{t('statistics.averageScore')}</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 bg-info text-white">
            <Card.Body>
              <i className="fas fa-clock fa-2x mb-2"></i>
              <h3>{formatTime(stats.totalTime)}</h3>
              <small>{t('statistics.totalTime')}</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0 bg-warning text-white">
            <Card.Body>
              <i className="fas fa-star fa-2x mb-2"></i>
              <h3>{Math.round(stats.averageScore / 20)}</h3>
              <small>Đánh giá trung bình</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                {t('statistics.quizzesBySubject')}
              </h5>
            </Card.Header>
            <Card.Body>
              <Bar data={quizzesBySubjectConfig} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-chart-pie me-2"></i>
                Phân bố câu trả lời theo chủ đề
              </h5>
            </Card.Header>
            <Card.Body>
              <Bar data={answersBySubjectConfig} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={12} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2"></i>
                {t('statistics.monthlyProgress')}
              </h5>
            </Card.Header>
            <Card.Body>
              <Line data={monthlyProgressConfig} options={chartOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Statistics Table */}
      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">
            <i className="fas fa-table me-2"></i>
            Thống kê chi tiết theo chủ đề
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="bg-light">
                <tr>
                  <th>Chủ đề</th>
                  <th>Số bài thi</th>
                  <th>Câu đúng</th>
                  <th>Câu sai</th>
                  <th>Tỷ lệ đúng</th>
                  <th>Thời gian trung bình</th>
                </tr>
              </thead>
              <tbody>
                {stats.answersBySubject.map((item, index) => {
                  const subjectQuizzes = QuizController.getQuizzesBySubject(index + 1);
                  const history = QuizController.getQuizHistory();
                  const subjectResults = history.filter(result => 
                    subjectQuizzes.some(quiz => quiz.id === result.quizId)
                  );
                  
                  const avgTime = subjectResults.length > 0 
                    ? Math.round(subjectResults.reduce((sum, result) => sum + result.timeSpent, 0) / subjectResults.length)
                    : 0;
                  
                  const accuracy = item.correct + item.incorrect > 0 
                    ? Math.round((item.correct / (item.correct + item.incorrect)) * 100)
                    : 0;

                  return (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle me-2"
                            style={{ 
                              width: '12px', 
                              height: '12px', 
                              backgroundColor: item.color 
                            }}
                          ></div>
                          {item.subject}
                        </div>
                      </td>
                      <td>
                        <Badge bg="primary">{stats.quizzesBySubject[index]?.count || 0}</Badge>
                      </td>
                      <td>
                        <span className="text-success fw-bold">{item.correct}</span>
                      </td>
                      <td>
                        <span className="text-danger fw-bold">{item.incorrect}</span>
                      </td>
                      <td>
                        <Badge bg={accuracy >= 80 ? 'success' : accuracy >= 60 ? 'warning' : 'danger'}>
                          {accuracy}%
                        </Badge>
                      </td>
                      <td>
                        <i className="fas fa-clock me-1 text-muted"></i>
                        {formatTime(avgTime)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StatisticsView;
