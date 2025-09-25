// QuizResult Model
class QuizResult {
  constructor(data = {}) {
    this.id = data.id || null;
    this.quizId = data.quizId || null;
    this.userId = data.userId || null;
    this.score = data.score || 0;
    this.totalQuestions = data.totalQuestions || 0;
    this.correctAnswers = data.correctAnswers || 0;
    this.timeSpent = data.timeSpent || 0; // minutes
    this.completedAt = data.completedAt || new Date().toISOString();
    this.answers = data.answers || [];
  }

  // Static methods
  static create(quizId, userId, scoreData, timeSpent, answers) {
    return new QuizResult({
      id: Date.now(),
      quizId,
      userId,
      score: scoreData.score,
      totalQuestions: scoreData.totalQuestions,
      correctAnswers: scoreData.correctAnswers,
      timeSpent,
      completedAt: new Date().toISOString(),
      answers
    });
  }

  static fromData(data) {
    return new QuizResult(data);
  }

  // Instance methods
  save() {
    const history = this.getHistory();
    history.unshift(this.toJSON());
    localStorage.setItem('quizHistory', JSON.stringify(history));
    return this;
  }

  static getHistory() {
    const savedHistory = localStorage.getItem('quizHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  }

  static getHistoryByUser(userId) {
    const history = QuizResult.getHistory();
    return history.filter(result => result.userId === userId);
  }

  static getHistoryByQuiz(quizId) {
    const history = QuizResult.getHistory();
    return history.filter(result => result.quizId === quizId);
  }

  static clearHistory() {
    localStorage.removeItem('quizHistory');
  }

  // Analysis methods
  getAccuracy() {
    return this.totalQuestions > 0 ? Math.round((this.correctAnswers / this.totalQuestions) * 100) : 0;
  }

  getGrade() {
    if (this.score >= 90) return 'A';
    if (this.score >= 80) return 'B';
    if (this.score >= 70) return 'C';
    if (this.score >= 60) return 'D';
    return 'F';
  }

  getPerformanceLevel() {
    if (this.score >= 80) return 'excellent';
    if (this.score >= 60) return 'good';
    return 'needs_improvement';
  }

  getTimePerQuestion() {
    return this.totalQuestions > 0 ? Math.round(this.timeSpent / this.totalQuestions) : 0;
  }

  // Date formatting
  getFormattedDate() {
    return new Date(this.completedAt).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getFormattedTime() {
    const hours = Math.floor(this.timeSpent / 60);
    const minutes = this.timeSpent % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  // Validation
  isValid() {
    return this.quizId && this.score >= 0 && this.totalQuestions > 0;
  }

  toJSON() {
    return {
      id: this.id,
      quizId: this.quizId,
      userId: this.userId,
      score: this.score,
      totalQuestions: this.totalQuestions,
      correctAnswers: this.correctAnswers,
      timeSpent: this.timeSpent,
      completedAt: this.completedAt,
      answers: this.answers
    };
  }
}

export default QuizResult;
