// Quiz Service
import Quiz from '../models/Quiz';
import QuizResult from '../models/QuizResult';
import Subject from '../models/Subject';
import { subjects, quizzes } from '../data/sampleData';

class QuizService {
  constructor() {
    this.subjects = subjects.map(subjectData => Subject.fromData(subjectData));
    this.quizzes = quizzes.map(quizData => Quiz.fromData(quizData));
  }

  // Subject methods
  getAllSubjects() {
    return this.subjects;
  }

  getSubjectById(id) {
    return this.subjects.find(subject => subject.id === id);
  }

  getQuizzesBySubject(subjectId) {
    return this.quizzes.filter(quiz => quiz.subjectId === subjectId);
  }

  // Quiz methods
  getAllQuizzes() {
    return this.quizzes;
  }

  getQuizById(id) {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  getQuizWithSubject(quizId) {
    const quiz = this.getQuizById(quizId);
    if (!quiz) return null;

    const subject = this.getSubjectById(quiz.subjectId);
    return {
      ...quiz,
      subject: subject
    };
  }

  // Quiz execution
  startQuiz(quizId) {
    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    return {
      quiz,
      timeLimit: quiz.getTimeLimitInSeconds(),
      totalQuestions: quiz.getTotalQuestions(),
      startTime: new Date()
    };
  }

  submitQuiz(quizId, answers, timeSpent, userId = null) {
    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    const scoreData = quiz.calculateScore(answers);
    const result = QuizResult.create(
      quizId,
      userId,
      scoreData,
      timeSpent,
      scoreData.results
    );

    if (userId) {
      result.save();
    }

    return result;
  }

  // Quiz history
  getQuizHistory(userId = null) {
    if (userId) {
      return QuizResult.getHistoryByUser(userId);
    }
    return QuizResult.getHistory();
  }

  getQuizResultById(resultId) {
    const history = QuizResult.getHistory();
    return history.find(result => result.id === resultId);
  }

  // Statistics
  getStatistics(userId = null) {
    const history = this.getQuizHistory(userId);
    
    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTime: 0,
        quizzesBySubject: [],
        monthlyProgress: [],
        answersBySubject: []
      };
    }

    // Basic stats
    const totalQuizzes = history.length;
    const totalScore = history.reduce((sum, result) => sum + result.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const totalTime = history.reduce((sum, result) => sum + result.timeSpent, 0);

    // Quizzes by subject
    const quizzesBySubject = this.subjects.map(subject => {
      const subjectQuizzes = this.getQuizzesBySubject(subject.id);
      const subjectResults = history.filter(result => 
        subjectQuizzes.some(quiz => quiz.id === result.quizId)
      );
      
      return {
        subject: subject.name,
        count: subjectResults.length,
        color: subject.color
      };
    });

    // Monthly progress (last 12 months)
    const monthlyData = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthResults = history.filter(result => {
        const resultDate = new Date(result.completedAt);
        return resultDate >= monthStart && resultDate <= monthEnd;
      });
      
      const correctAnswers = monthResults.reduce((sum, result) => sum + result.correctAnswers, 0);
      const totalAnswers = monthResults.reduce((sum, result) => sum + result.totalQuestions, 0);
      const incorrectAnswers = totalAnswers - correctAnswers;
      
      monthlyData.push({
        month: date.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' }),
        correct: correctAnswers,
        incorrect: incorrectAnswers
      });
    }

    // Answers by subject
    const answersBySubject = this.subjects.map(subject => {
      const subjectQuizzes = this.getQuizzesBySubject(subject.id);
      const subjectResults = history.filter(result => 
        subjectQuizzes.some(quiz => quiz.id === result.quizId)
      );
      
      const correctAnswers = subjectResults.reduce((sum, result) => sum + result.correctAnswers, 0);
      const totalAnswers = subjectResults.reduce((sum, result) => sum + result.totalQuestions, 0);
      const incorrectAnswers = totalAnswers - correctAnswers;
      
      return {
        subject: subject.name,
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        color: subject.color
      };
    });

    return {
      totalQuizzes,
      averageScore,
      totalTime,
      quizzesBySubject,
      monthlyProgress: monthlyData,
      answersBySubject
    };
  }

  // Search and filter
  searchQuizzes(query) {
    const searchTerm = query.toLowerCase();
    return this.quizzes.filter(quiz => 
      quiz.title.toLowerCase().includes(searchTerm) ||
      quiz.description.toLowerCase().includes(searchTerm)
    );
  }

  filterQuizzesBySubject(subjectId) {
    return this.getQuizzesBySubject(subjectId);
  }

  // Recent quizzes
  getRecentQuizzes(userId, limit = 5) {
    const history = this.getQuizHistory(userId);
    return history
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
      .slice(0, limit)
      .map(result => {
        const quiz = this.getQuizById(result.quizId);
        const subject = this.getSubjectById(quiz?.subjectId);
        return {
          ...result,
          quizTitle: quiz?.title,
          subjectName: subject?.name
        };
      });
  }
}

// Export singleton instance
export default new QuizService();
