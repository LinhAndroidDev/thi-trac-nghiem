// Authentication Controller
import AuthService from '../services/AuthService';

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  // Login
  async login(credentials) {
    try {
      const validation = this.authService.validateLogin(credentials.username, credentials.password);
      
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      const user = await this.authService.login(credentials.username, credentials.password);
      
      return {
        success: true,
        user,
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Register
  async register(userData) {
    try {
      const validation = this.authService.validateRegistration(userData);
      
      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      const user = await this.authService.register(userData);
      
      return {
        success: true,
        user,
        message: 'Registration successful'
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Logout
  logout() {
    try {
      this.authService.logout();
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Get current user
  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  // Check authentication
  isAuthenticated() {
    return this.authService.isLoggedIn();
  }

  // Update profile
  async updateProfile(profileData) {
    try {
      if (!this.authService.isLoggedIn()) {
        return {
          success: false,
          errors: ['User not authenticated']
        };
      }

      const user = this.authService.updateProfile(profileData);
      
      return {
        success: true,
        user,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      if (!this.authService.isLoggedIn()) {
        return {
          success: false,
          errors: ['User not authenticated']
        };
      }

      const { oldPassword, newPassword, confirmNewPassword } = passwordData;
      
      if (newPassword !== confirmNewPassword) {
        return {
          success: false,
          errors: ['New passwords do not match']
        };
      }

      this.authService.changePassword(oldPassword, newPassword);
      
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message]
      };
    }
  }

  // Check session
  checkSession() {
    return this.authService.checkSession();
  }
}

export default new AuthController();
