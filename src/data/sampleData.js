// Dữ liệu mẫu cho ứng dụng thi trắc nghiệm

export const subjects = [
  {
    id: 1,
    name: 'Toán học',
    description: 'Các bài thi trắc nghiệm môn Toán học',
    color: '#007bff'
  },
  {
    id: 2,
    name: 'Vật lý',
    description: 'Các bài thi trắc nghiệm môn Vật lý',
    color: '#28a745'
  },
  {
    id: 3,
    name: 'Hóa học',
    description: 'Các bài thi trắc nghiệm môn Hóa học',
    color: '#dc3545'
  },
  {
    id: 4,
    name: 'Sinh học',
    description: 'Các bài thi trắc nghiệm môn Sinh học',
    color: '#ffc107'
  },
  {
    id: 5,
    name: 'Lịch sử',
    description: 'Các bài thi trắc nghiệm môn Lịch sử',
    color: '#6f42c1'
  },
  {
    id: 6,
    name: 'Địa lý',
    description: 'Các bài thi trắc nghiệm môn Địa lý',
    color: '#20c997'
  }
];

export const quizzes = [
  {
    id: 1,
    subjectId: 1,
    title: 'Đại số cơ bản',
    description: 'Bài thi về các khái niệm đại số cơ bản',
    timeLimit: 30, // phút
    questions: [
      {
        id: 1,
        question: 'Giá trị của x trong phương trình 2x + 5 = 13 là:',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 1,
        explanation: 'Giải phương trình: 2x + 5 = 13 → 2x = 8 → x = 4'
      },
      {
        id: 2,
        question: 'Kết quả của phép tính (3 + 4) × 2 là:',
        options: ['14', '10', '11', '12'],
        correctAnswer: 0,
        explanation: 'Thực hiện phép tính: (3 + 4) × 2 = 7 × 2 = 14'
      },
      {
        id: 3,
        question: 'Số nào là số nguyên tố?',
        options: ['4', '6', '7', '8'],
        correctAnswer: 2,
        explanation: 'Số nguyên tố là số tự nhiên lớn hơn 1 và chỉ có 2 ước là 1 và chính nó. Số 7 thỏa mãn điều kiện này.'
      }
    ]
  },
  {
    id: 2,
    subjectId: 1,
    title: 'Hình học',
    description: 'Bài thi về các khái niệm hình học cơ bản',
    timeLimit: 25,
    questions: [
      {
        id: 4,
        question: 'Diện tích hình vuông có cạnh 5cm là:',
        options: ['20cm²', '25cm²', '30cm²', '35cm²'],
        correctAnswer: 1,
        explanation: 'Diện tích hình vuông = cạnh × cạnh = 5 × 5 = 25cm²'
      },
      {
        id: 5,
        question: 'Chu vi hình tròn có bán kính 3cm là:',
        options: ['6π cm', '9π cm', '12π cm', '18π cm'],
        correctAnswer: 0,
        explanation: 'Chu vi hình tròn = 2πr = 2π × 3 = 6π cm'
      }
    ]
  },
  {
    id: 3,
    subjectId: 2,
    title: 'Cơ học',
    description: 'Bài thi về các khái niệm cơ học cơ bản',
    timeLimit: 20,
    questions: [
      {
        id: 6,
        question: 'Đơn vị đo lực trong hệ SI là:',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1,
        explanation: 'Đơn vị đo lực trong hệ SI là Newton (N)'
      },
      {
        id: 7,
        question: 'Gia tốc trọng trường trên Trái Đất có giá trị khoảng:',
        options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'],
        correctAnswer: 0,
        explanation: 'Gia tốc trọng trường trên Trái Đất có giá trị khoảng 9.8 m/s²'
      }
    ]
  },
  {
    id: 4,
    subjectId: 3,
    title: 'Hóa học cơ bản',
    description: 'Bài thi về các khái niệm hóa học cơ bản',
    timeLimit: 25,
    questions: [
      {
        id: 8,
        question: 'Công thức hóa học của nước là:',
        options: ['H2O', 'H2O2', 'HO2', 'H3O'],
        correctAnswer: 0,
        explanation: 'Công thức hóa học của nước là H2O (2 nguyên tử H và 1 nguyên tử O)'
      },
      {
        id: 9,
        question: 'Nguyên tố có ký hiệu hóa học là Na là:',
        options: ['Natri', 'Niken', 'Nitơ', 'Neon'],
        correctAnswer: 0,
        explanation: 'Na là ký hiệu hóa học của nguyên tố Natri'
      }
    ]
  }
];

export const sampleUser = {
  id: 1,
  username: 'demo_user',
  email: 'demo@example.com',
  fullName: 'Người dùng Demo',
  joinDate: '2024-01-01'
};

export const sampleQuizHistory = [
  {
    id: 1,
    quizId: 1,
    userId: 1,
    score: 85,
    totalQuestions: 3,
    correctAnswers: 2,
    timeSpent: 15, // phút
    completedAt: '2024-01-15T10:30:00Z',
    answers: [
      { questionId: 1, selectedAnswer: 1, isCorrect: true },
      { questionId: 2, selectedAnswer: 0, isCorrect: true },
      { questionId: 3, selectedAnswer: 2, isCorrect: false }
    ]
  },
  {
    id: 2,
    quizId: 2,
    userId: 1,
    score: 90,
    totalQuestions: 2,
    correctAnswers: 2,
    timeSpent: 12,
    completedAt: '2024-01-14T14:20:00Z',
    answers: [
      { questionId: 4, selectedAnswer: 1, isCorrect: true },
      { questionId: 5, selectedAnswer: 0, isCorrect: true }
    ]
  }
];
