// Authentication Service
import User from '../models/User';

class AuthService {
  constructor() {
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  // Login methods
  login(username, password) {
    // In real app, this would make API call
    return new Promise((resolve, reject) => {
      if (username && password) {
        const user = User.create({
          username,
          email: `${username}@example.com`,
          fullName: username
        });
        
        this.currentUser = user;
        this.isAuthenticated = true;
        user.save();
        
        resolve(user);
      } else {
        reject(new Error('Username and password are required'));
      }
    });
  }

  register(userData) {
    return new Promise((resolve, reject) => {
      if (userData.username && userData.email && userData.password) {
        if (userData.password !== userData.confirmPassword) {
          reject(new Error('Passwords do not match'));
          return;
        }

        const user = User.create(userData);
        this.currentUser = user;
        this.isAuthenticated = true;
        user.save();
        
        resolve(user);
      } else {
        reject(new Error('All fields are required'));
      }
    });
  }

  logout() {
    this.currentUser = null;
    this.isAuthenticated = false;
    return User.fromLocalStorage().logout();
  }

  // User management
  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = User.fromLocalStorage();
      this.isAuthenticated = this.currentUser.id !== null;
    }
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isAuthenticated || this.getCurrentUser().id !== null;
  }

  updateProfile(profileData) {
    if (!this.isLoggedIn()) {
      throw new Error('User not authenticated');
    }

    const user = this.getCurrentUser();
    user.updateProfile(profileData);
    this.currentUser = user;
    return user;
  }

  changePassword(oldPassword, newPassword) {
    if (!this.isLoggedIn()) {
      throw new Error('User not authenticated');
    }

    if (newPassword !== oldPassword) {
      throw new Error('New password must be different from old password');
    }

    const user = this.getCurrentUser();
    return user.changePassword(oldPassword, newPassword);
  }

  // Session management
  checkSession() {
    const user = User.fromLocalStorage();
    if (user.id) {
      this.currentUser = user;
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Validation methods
  validateLogin(username, password) {
    const errors = [];
    
    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  validateRegistration(userData) {
    const errors = [];
    
    if (!userData.username) errors.push('Username is required');
    if (!userData.email) errors.push('Email is required');
    if (!userData.fullName) errors.push('Full name is required');
    if (!userData.password) errors.push('Password is required');
    if (userData.password !== userData.confirmPassword) {
      errors.push('Passwords do not match');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export default new AuthService();
