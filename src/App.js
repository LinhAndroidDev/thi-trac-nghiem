import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import contexts and components
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import History from './pages/History';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

// Import i18n
import './utils/i18n';

const AppContent = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('home');
  const [currentQuiz, setCurrentQuiz] = useState(null);

  // Apply theme
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', state.theme);
  }, [state.theme]);

  const handleQuizStart = (quiz) => {
    setCurrentQuiz(quiz);
    setActiveTab('quiz');
  };

  const handleQuizFinish = () => {
    setCurrentQuiz(null);
    setActiveTab('home');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            setActiveTab={setActiveTab} 
            setCurrentQuiz={handleQuizStart}
          />
        );
      case 'quiz':
        return currentQuiz ? (
          <Quiz 
            quiz={currentQuiz}
            onBack={() => setActiveTab('home')}
            onFinish={handleQuizFinish}
          />
        ) : (
          <Home 
            setActiveTab={setActiveTab} 
            setCurrentQuiz={handleQuizStart}
          />
        );
      case 'history':
        return <History />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Home 
            setActiveTab={setActiveTab} 
            setCurrentQuiz={handleQuizStart}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col xs={12} md={3} lg={2}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>
          <Col xs={12} md={9} lg={10}>
            <div className="main-content" style={{ minHeight: 'calc(100vh - 56px)' }}>
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
