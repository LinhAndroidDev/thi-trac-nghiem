// Main App Component - MVC Pattern
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import Controllers
import AppController from './controllers/AppController';

// Import Views
import HomeView from './views/HomeView';
import QuizView from './views/QuizView';
import HistoryView from './views/HistoryView';
import StatisticsView from './views/StatisticsView';
import SettingsView from './views/SettingsView';

// Import Components
import HeaderMVC from './components/HeaderMVC';
import Sidebar from './components/Sidebar';

// Import i18n
import './utils/i18n';

const AppMVC = () => {
  const [appState, setAppState] = useState({
    currentView: 'home',
    currentQuiz: null,
    isAuthenticated: false,
    user: null,
    theme: 'light',
    language: 'vi'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      const initData = AppController.initialize();
      setAppState(prevState => ({
        ...prevState,
        ...initData
      }));
    } catch (error) {
      console.error('Error initializing app:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppState = () => {
    const newState = AppController.getAppState();
    setAppState(newState);
  };

  const handleNavigation = (view, data = {}) => {
    const result = AppController.navigateTo(view, data);
    if (result.success) {
      updateAppState();
    }
  };

  const handleQuizStart = (quiz) => {
    handleNavigation('quiz', { quiz });
  };

  const handleQuizFinish = () => {
    handleNavigation('home');
  };

  const handleAuthChange = () => {
    updateAppState();
  };

  const handleThemeChange = (theme) => {
    AppController.setTheme(theme);
    updateAppState();
  };

  const handleLanguageChange = (language) => {
    AppController.setLanguage(language);
    updateAppState();
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'home':
        return (
          <HomeView 
            onQuizStart={handleQuizStart}
            onNavigate={handleNavigation}
          />
        );
      case 'quiz':
        return appState.currentQuiz ? (
          <QuizView 
            quiz={appState.currentQuiz}
            onBack={() => handleNavigation('home')}
            onFinish={handleQuizFinish}
          />
        ) : (
          <HomeView 
            onQuizStart={handleQuizStart}
            onNavigate={handleNavigation}
          />
        );
      case 'history':
        return <HistoryView />;
      case 'statistics':
        return <StatisticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <HomeView 
            onQuizStart={handleQuizStart}
            onNavigate={handleNavigation}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Đang tải ứng dụng...</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <HeaderMVC 
        onAuthChange={handleAuthChange}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col xs={12} md={3} lg={2}>
            <Sidebar 
              activeTab={appState.currentView}
              setActiveTab={(view) => handleNavigation(view)}
            />
          </Col>
          <Col xs={12} md={9} lg={10}>
            <div className="main-content" style={{ minHeight: 'calc(100vh - 56px)' }}>
              {renderCurrentView()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AppMVC;
