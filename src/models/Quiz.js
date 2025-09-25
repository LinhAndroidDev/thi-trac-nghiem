// Quiz Model
class Quiz {
  constructor(data = {}) {
    this.id = data.id || null;
    this.subjectId = data.subjectId || null;
    this.title = data.title || '';
    this.description = data.description || '';
    this.timeLimit = data.timeLimit || 30; // minutes
    this.questions = data.questions || [];
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  // Static methods
  static create(quizData) {
    return new Quiz({
      id: Date.now(),
      ...quizData,
      createdAt: new Date().toISOString()
    });
  }

  static fromData(quizData) {
    return new Quiz(quizData);
  }

  // Instance methods
  getTotalQuestions() {
    return this.questions.length;
  }

  getQuestionById(questionId) {
    return this.questions.find(q => q.id === questionId);
  }

  getQuestionByIndex(index) {
    return this.questions[index];
  }

  getTimeLimitInSeconds() {
    return this.timeLimit * 60;
  }

  getTimeLimitInMinutes() {
    return this.timeLimit;
  }

  // Validation
  isValid() {
    return this.title && this.questions.length > 0 && this.timeLimit > 0;
  }

  // Quiz execution methods
  calculateScore(answers) {
    let correctCount = 0;
    const results = [];

    this.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) correctCount++;
      
      results.push({
        questionId: question.id,
        selectedAnswer: userAnswer,
        isCorrect: isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    });

    const score = Math.round((correctCount / this.questions.length) * 100);
    
    return {
      score,
      totalQuestions: this.questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: this.questions.length - correctCount,
      results
    };
  }

  toJSON() {
    return {
      id: this.id,
      subjectId: this.subjectId,
      title: this.title,
      description: this.description,
      timeLimit: this.timeLimit,
      questions: this.questions,
      createdAt: this.createdAt
    };
  }
}

export default Quiz;
