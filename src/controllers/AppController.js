// Main App Controller - MVC Pattern
import AuthController from './AuthController';
import QuizController from './QuizController';
import ThemeController from './ThemeController';

class AppController {
  constructor() {
    this.authController = AuthController;
    this.quizController = QuizController;
    this.themeController = ThemeController;
    this.currentView = 'home';
    this.currentQuiz = null;
  }

  // View management
  getCurrentView() {
    return this.currentView;
  }

  setCurrentView(view) {
    this.currentView = view;
  }

  // Quiz management
  getCurrentQuiz() {
    return this.currentQuiz;
  }

  setCurrentQuiz(quiz) {
    this.currentQuiz = quiz;
  }

  // Navigation
  navigateTo(view, data = {}) {
    this.setCurrentView(view);
    
    if (view === 'quiz' && data.quiz) {
      this.setCurrentQuiz(data.quiz);
    }
    
    return {
      success: true,
      view,
      data
    };
  }

  // Authentication methods
  async login(credentials) {
    return await this.authController.login(credentials);
  }

  async register(userData) {
    return await this.authController.register(userData);
  }

  logout() {
    return this.authController.logout();
  }

  getCurrentUser() {
    return this.authController.getCurrentUser();
  }

  isAuthenticated() {
    return this.authController.isAuthenticated();
  }

  async updateProfile(profileData) {
    return await this.authController.updateProfile(profileData);
  }

  async changePassword(passwordData) {
    return await this.authController.changePassword(passwordData);
  }

  // Quiz methods
  getSubjects() {
    return this.quizController.getSubjects();
  }

  getQuizzesBySubject(subjectId) {
    return this.quizController.getQuizzesBySubject(subjectId);
  }

  getQuizById(quizId) {
    return this.quizController.getQuizById(quizId);
  }

  startQuiz(quizId) {
    const result = this.quizController.startQuiz(quizId);
    if (result.success) {
      this.setCurrentQuiz(result.data.quiz);
      this.setCurrentView('quiz');
    }
    return result;
  }

  submitQuiz(quizId, answers, timeSpent) {
    return this.quizController.submitQuiz(quizId, answers, timeSpent);
  }

  getQuizHistory() {
    return this.quizController.getQuizHistory();
  }

  getStatistics() {
    return this.quizController.getStatistics();
  }

  getRecentQuizzes(limit = 5) {
    return this.quizController.getRecentQuizzes(limit);
  }

  getHomeData() {
    return this.quizController.getHomeData();
  }

  // Theme methods
  getCurrentTheme() {
    return this.themeController.getCurrentTheme();
  }

  setTheme(theme) {
    return this.themeController.setTheme(theme);
  }

  toggleTheme() {
    return this.themeController.toggleTheme();
  }

  getCurrentLanguage() {
    return this.themeController.getCurrentLanguage();
  }

  setLanguage(language) {
    return this.themeController.setLanguage(language);
  }

  getThemeSettings() {
    return this.themeController.getThemeSettings();
  }

  // App initialization
  initialize() {
    // Initialize theme
    this.themeController.initialize();
    
    // Check authentication
    this.authController.checkSession();
    
    return {
      success: true,
      theme: this.getCurrentTheme(),
      language: this.getCurrentLanguage(),
      isAuthenticated: this.isAuthenticated(),
      user: this.getCurrentUser()
    };
  }

  // App state
  getAppState() {
    return {
      currentView: this.currentView,
      currentQuiz: this.currentQuiz,
      isAuthenticated: this.isAuthenticated(),
      user: this.getCurrentUser(),
      theme: this.getCurrentTheme(),
      language: this.getCurrentLanguage()
    };
  }

  // Reset app
  reset() {
    this.currentView = 'home';
    this.currentQuiz = null;
    this.logout();
    this.themeController.reset();
    
    return {
      success: true,
      message: 'App reset successfully'
    };
  }
}

export default new AppController();
