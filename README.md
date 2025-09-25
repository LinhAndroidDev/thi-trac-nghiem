# 🎓 Hệ Thống Thi Trắc Nghiệm Online

> Ứng dụng web thi trắc nghiệm được xây dựng với React.js và Bootstrap, áp dụng mô hình MVC để dễ bảo trì và mở rộng.

## 📋 Mục Lục

- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Cài đặt](#-cài-đặt)
- [Sử dụng](#-sử-dụng)
- [Cấu hình Port](#-cấu-hình-port)
- [API Documentation](#-api-documentation)
- [Đóng góp](#-đóng-góp)
- [License](#-license)

## ✨ Tính năng

### 🔐 Xác thực người dùng
- **Đăng nhập/Đăng ký** với validation
- **Đổi mật khẩu** an toàn
- **Lưu trữ thông tin** trong localStorage
- **Làm bài thi không cần đăng nhập** (guest mode)

### 📚 Quản lý bài thi
- **6 chủ đề** đa dạng: Toán, Lý, Hóa, Sinh, Sử, Địa
- **Timer đếm ngược** thông minh
- **4 phương án** cho mỗi câu hỏi
- **Hiển thị đáp án** ngay sau khi chọn
- **Giải thích chi tiết** cho từng câu hỏi
- **Navigation** giữa các câu hỏi

### 📊 Thống kê và báo cáo
- **Lịch sử bài thi** chi tiết
- **Biểu đồ thống kê** tương tác với Chart.js
- **Phân tích theo chủ đề** và thời gian
- **Điểm số và đánh giá** kết quả

### ⚙️ Cài đặt và tùy chỉnh
- **Dark/Light theme** có thể chuyển đổi
- **Đa ngôn ngữ** (Tiếng Việt/Tiếng Anh)
- **Responsive design** cho mọi thiết bị
- **Cài đặt người dùng** linh hoạt

## 🛠 Công nghệ sử dụng

### Frontend
- **React.js 19.1.1** - Framework chính
- **Bootstrap 5.3.8** - UI Framework
- **React Bootstrap 2.10.10** - Component library
- **Chart.js 4.5.0** - Biểu đồ tương tác
- **React i18next 15.7.3** - Đa ngôn ngữ

### Development Tools
- **React Scripts 5.0.1** - Build tools
- **ESLint** - Code linting
- **Font Awesome** - Icons

### Architecture
- **MVC Pattern** - Model-View-Controller
- **Service Layer** - Business logic
- **Context API** - State management
- **Local Storage** - Data persistence

## 📁 Cấu trúc dự án

```
src/
├── models/                 # Models (Mô hình dữ liệu)
│   ├── User.js            # Quản lý người dùng
│   ├── Quiz.js            # Quản lý bài thi
│   ├── QuizResult.js      # Quản lý kết quả
│   └── Subject.js         # Quản lý chủ đề
├── controllers/            # Controllers (Bộ điều khiển)
│   ├── AppController.js   # Controller chính
│   ├── AuthController.js  # Xử lý xác thực
│   ├── QuizController.js  # Xử lý bài thi
│   └── ThemeController.js # Xử lý theme
├── services/              # Services (Tầng dịch vụ)
│   ├── AuthService.js     # Dịch vụ xác thực
│   ├── QuizService.js     # Dịch vụ bài thi
│   └── ThemeService.js    # Dịch vụ theme
├── views/                 # Views (Giao diện)
│   ├── HomeView.js        # Trang chủ
│   ├── QuizView.js        # Làm bài thi
│   ├── HistoryView.js     # Lịch sử
│   ├── StatisticsView.js  # Thống kê
│   └── SettingsView.js    # Cài đặt
├── components/            # Components tái sử dụng
│   ├── Header.js          # Header component
│   ├── HeaderMVC.js       # Header MVC
│   └── Sidebar.js         # Sidebar navigation
├── data/                  # Dữ liệu mẫu
│   └── sampleData.js      # Dữ liệu test
├── locales/               # Ngôn ngữ
│   ├── vi.json           # Tiếng Việt
│   └── en.json           # English
├── utils/                 # Utilities
│   ├── i18n.js           # Cấu hình i18n
│   └── helpers/          # Helper functions
└── scripts/               # Scripts tự động
    ├── start.js          # Tự động tìm port
    └── kill-port.js      # Dừng process
```

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 14.0.0
- npm >= 6.0.0

### Cài đặt dependencies

```bash
# Clone repository
git clone <repository-url>
cd thi-trac-nghiem

# Cài đặt dependencies
npm install

# Hoặc sử dụng yarn
yarn install
```

### Chạy ứng dụng

```bash
# Chạy với port tự động
npm start

# Chạy với port cụ thể
npm run start:3000  # Port 3000
npm run start:3001  # Port 3001
npm run start:3002  # Port 3002

# Build cho production
npm run build
```

## 💻 Sử dụng

### Truy cập ứng dụng
- **URL**: http://localhost:3001 (hoặc port được chọn)
- **Guest mode**: Làm bài thi mà không cần đăng nhập
- **User mode**: Đăng ký/đăng nhập để lưu lịch sử

### Làm bài thi
1. **Chọn chủ đề** từ trang chủ
2. **Chọn bài thi** muốn làm
3. **Đọc câu hỏi** và chọn đáp án
4. **Xem giải thích** ngay sau khi chọn
5. **Nộp bài** và xem kết quả

### Xem thống kê
1. **Đăng nhập** để xem thống kê
2. **Vào mục Thống kê** từ sidebar
3. **Xem biểu đồ** và bảng thống kê
4. **Phân tích kết quả** theo chủ đề

## 🔧 Cấu hình Port

### Vấn đề xung đột port
Dự án đã được cấu hình để tránh xung đột port:

```bash
# Tự động tìm port trống
npm start

# Dừng process trên port cụ thể
npm run kill:3000   # Dừng port 3000
npm run kill:3001   # Dừng port 3001
npm run kill:all    # Dừng tất cả

# Chạy trên port cụ thể
npm run start:3000  # Port 3000
npm run start:3001  # Port 3001
npm run start:3002  # Port 3002
```

### File cấu hình
- **.env**: Cấu hình port mặc định
- **scripts/start.js**: Tự động tìm port trống
- **scripts/kill-port.js**: Dừng process cũ

## 📚 API Documentation

### Models

#### User Model
```javascript
const user = new User({
  id: 1,
  username: 'user123',
  email: 'user@example.com',
  fullName: 'Người dùng',
  joinDate: '2024-01-01'
});
```

#### Quiz Model
```javascript
const quiz = new Quiz({
  id: 1,
  subjectId: 1,
  title: 'Đại số cơ bản',
  timeLimit: 30,
  questions: [...]
});
```

### Controllers

#### AuthController
```javascript
// Đăng nhập
const result = await AuthController.login({
  username: 'user123',
  password: 'password'
});

// Đăng ký
const result = await AuthController.register({
  username: 'user123',
  email: 'user@example.com',
  password: 'password'
});
```

#### QuizController
```javascript
// Lấy danh sách chủ đề
const subjects = QuizController.getSubjects();

// Bắt đầu bài thi
const result = QuizController.startQuiz(quizId);

// Nộp bài thi
const result = QuizController.submitQuiz(quizId, answers, timeSpent);
```

### Services

#### AuthService
```javascript
// Kiểm tra đăng nhập
const isLoggedIn = AuthService.isLoggedIn();

// Lấy user hiện tại
const user = AuthService.getCurrentUser();
```

#### QuizService
```javascript
// Lấy thống kê
const stats = QuizService.getStatistics(userId);

// Lấy lịch sử
const history = QuizService.getQuizHistory(userId);
```

## 🎯 Tính năng nổi bật

### 🏗️ Kiến trúc MVC
- **Tách biệt** logic nghiệp vụ khỏi giao diện
- **Dễ bảo trì** và mở rộng
- **Tái sử dụng** code hiệu quả

### 📱 Responsive Design
- **Mobile-first** approach
- **Bootstrap 5** framework
- **Cross-platform** compatibility

### 🌐 Đa ngôn ngữ
- **Tiếng Việt** và **English**
- **Dynamic switching** không cần reload
- **Localized** content

### 📊 Biểu đồ tương tác
- **Chart.js** integration
- **Real-time** data visualization
- **Export** capabilities

## 🚀 Deployment

### Build cho production
```bash
npm run build
```

### Deploy lên hosting
1. **Build** ứng dụng
2. **Upload** thư mục `build/` lên server
3. **Cấu hình** web server (Apache/Nginx)
4. **SSL** certificate (khuyến nghị)

## 🤝 Đóng góp

### Cách đóng góp
1. **Fork** repository
2. **Tạo branch** mới: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** lên branch: `git push origin feature/amazing-feature`
5. **Tạo Pull Request**

### Quy tắc code
- **ESLint** compliance
- **MVC pattern** adherence
- **Documentation** cho functions mới
- **Testing** cho features mới

## 📝 Changelog

### Version 1.0.0
- ✅ Hoàn thành kiến trúc MVC
- ✅ Tích hợp đa ngôn ngữ
- ✅ Biểu đồ thống kê
- ✅ Responsive design
- ✅ Port configuration

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- **Project Link**: [https://github.com/username/thi-trac-nghiem](https://github.com/username/thi-trac-nghiem)
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- **React.js** team cho framework tuyệt vời
- **Bootstrap** team cho UI framework
- **Chart.js** team cho biểu đồ tương tác
- **Font Awesome** team cho icons

---

**⭐ Nếu dự án hữu ích, hãy star repository này!**