// Quiz Controller
import QuizService from '../services/QuizService';
import AuthController from './AuthController';

class QuizController {
  constructor() {
    this.quizService = QuizService;
    this.authController = AuthController;
  }

  // Get all subjects
  getSubjects() {
    return this.quizService.getAllSubjects();
  }

  // Get subject by ID
  getSubjectById(id) {
    return this.quizService.getSubjectById(id);
  }

  // Get quizzes by subject
  getQuizzesBySubject(subjectId) {
    return this.quizService.getQuizzesBySubject(subjectId);
  }

  // Get all quizzes
  getQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  // Get quiz by ID
  getQuizById(id) {
    return this.quizService.getQuizById(id);
  }

  // Get quiz with subject info
  getQuizWithSubject(quizId) {
    return this.quizService.getQuizWithSubject(quizId);
  }

  // Start quiz
  startQuiz(quizId) {
    try {
      const quizSession = this.quizService.startQuiz(quizId);
      return {
        success: true,
        data: quizSession
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Submit quiz
  submitQuiz(quizId, answers, timeSpent) {
    try {
      const userId = this.authController.isAuthenticated() 
        ? this.authController.getCurrentUser().id 
        : null;

      const result = this.quizService.submitQuiz(quizId, answers, timeSpent, userId);
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Get quiz history
  getQuizHistory() {
    const userId = this.authController.isAuthenticated() 
      ? this.authController.getCurrentUser().id 
      : null;

    const history = this.quizService.getQuizHistory(userId);
    
    // Enhance history with quiz and subject info
    return history.map(result => {
      const quiz = this.quizService.getQuizById(result.quizId);
      const subject = this.quizService.getSubjectById(quiz?.subjectId);
      
      return {
        ...result,
        quizTitle: quiz?.title,
        subjectName: subject?.name,
        subjectColor: subject?.color
      };
    });
  }

  // Get quiz result by ID
  getQuizResultById(resultId) {
    const result = this.quizService.getQuizResultById(resultId);
    if (!result) {
      return {
        success: false,
        errors: ['Quiz result not found']
      };
    }

    const quiz = this.quizService.getQuizById(result.quizId);
    const subject = this.quizService.getSubjectById(quiz?.subjectId);

    return {
      success: true,
      data: {
        ...result,
        quiz,
        subject
      }
    };
  }

  // Get statistics
  getStatistics() {
    const userId = this.authController.isAuthenticated() 
      ? this.authController.getCurrentUser().id 
      : null;

    return this.quizService.getStatistics(userId);
  }

  // Get recent quizzes
  getRecentQuizzes(limit = 5) {
    const userId = this.authController.isAuthenticated() 
      ? this.authController.getCurrentUser().id 
      : null;

    return this.quizService.getRecentQuizzes(userId, limit);
  }

  // Search quizzes
  searchQuizzes(query) {
    return this.quizService.searchQuizzes(query);
  }

  // Filter quizzes
  filterQuizzesBySubject(subjectId) {
    return this.quizService.filterQuizzesBySubject(subjectId);
  }

  // Get home page data
  getHomeData() {
    const subjects = this.getSubjects();
    const recentQuizzes = this.getRecentQuizzes();
    const isAuthenticated = this.authController.isAuthenticated();

    return {
      subjects,
      recentQuizzes,
      isAuthenticated
    };
  }
}

export default new QuizController();
