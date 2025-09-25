// Subject Model
class Subject {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.color = data.color || '#007bff';
    this.icon = data.icon || 'fas fa-book';
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Static methods
  static create(subjectData) {
    return new Subject({
      id: Date.now(),
      ...subjectData,
      createdAt: new Date().toISOString()
    });
  }

  static fromData(subjectData) {
    return new Subject(subjectData);
  }

  // Instance methods
  getQuizzes(quizzes = []) {
    return quizzes.filter(quiz => quiz.subjectId === this.id);
  }

  getQuizCount(quizzes = []) {
    return this.getQuizzes(quizzes).length;
  }

  getAverageScore(quizResults = []) {
    const subjectResults = quizResults.filter(result => {
      // This would need quiz data to match by subjectId
      return result.quizId; // Simplified for now
    });

    if (subjectResults.length === 0) return 0;

    const totalScore = subjectResults.reduce((sum, result) => sum + result.score, 0);
    return Math.round(totalScore / subjectResults.length);
  }

  getTotalTimeSpent(quizResults = []) {
    const subjectResults = quizResults.filter(result => {
      return result.quizId; // Simplified for now
    });

    return subjectResults.reduce((sum, result) => sum + result.timeSpent, 0);
  }

  // Validation
  isValid() {
    return this.name && this.color;
  }

  // Display methods
  getDisplayName() {
    return this.name;
  }

  getColorClass() {
    return `text-${this.color.replace('#', '')}`;
  }

  getIconClass() {
    return this.icon;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      color: this.color,
      icon: this.icon,
      createdAt: this.createdAt
    };
  }
}

export default Subject;
