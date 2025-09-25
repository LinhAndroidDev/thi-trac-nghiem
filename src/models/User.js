// User Model
class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.username = data.username || '';
    this.email = data.email || '';
    this.fullName = data.fullName || '';
    this.joinDate = data.joinDate || new Date().toISOString();
    this.isAuthenticated = data.isAuthenticated || false;
  }

  // Static methods for user operations
  static create(userData) {
    return new User({
      id: Date.now(),
      ...userData,
      joinDate: new Date().toISOString(),
      isAuthenticated: true
    });
  }

  static fromLocalStorage() {
    const savedUser = localStorage.getItem('quizUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      return new User({ ...userData, isAuthenticated: true });
    }
    return new User();
  }

  // Instance methods
  save() {
    localStorage.setItem('quizUser', JSON.stringify(this.toJSON()));
    return this;
  }

  logout() {
    localStorage.removeItem('quizUser');
    return new User();
  }

  updateProfile(profileData) {
    Object.assign(this, profileData);
    return this.save();
  }

  changePassword(oldPassword, newPassword) {
    // In real app, this would validate and hash passwords
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      fullName: this.fullName,
      joinDate: this.joinDate
    };
  }

  // Validation methods
  isValid() {
    return this.username && this.email && this.fullName;
  }

  getDisplayName() {
    return this.fullName || this.username;
  }
}

export default User;
