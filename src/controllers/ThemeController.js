// Theme Controller
import ThemeService from '../services/ThemeService';

class ThemeController {
  constructor() {
    this.themeService = ThemeService;
  }

  // Get current theme
  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  // Set theme
  setTheme(theme) {
    this.themeService.setTheme(theme);
    return {
      success: true,
      theme,
      message: 'Theme updated successfully'
    };
  }

  // Toggle theme
  toggleTheme() {
    const newTheme = this.themeService.toggleTheme();
    return {
      success: true,
      theme: newTheme,
      message: `Theme changed to ${newTheme}`
    };
  }

  // Get current language
  getCurrentLanguage() {
    return this.themeService.getCurrentLanguage();
  }

  // Set language
  setLanguage(language) {
    this.themeService.setLanguage(language);
    return {
      success: true,
      language,
      message: 'Language updated successfully'
    };
  }

  // Get available themes
  getAvailableThemes() {
    return this.themeService.getAvailableThemes();
  }

  // Get available languages
  getAvailableLanguages() {
    return this.themeService.getAvailableLanguages();
  }

  // Initialize theme service
  initialize() {
    return this.themeService.initialize();
  }

  // Reset to defaults
  reset() {
    return this.themeService.reset();
  }

  // Get theme settings
  getThemeSettings() {
    return {
      currentTheme: this.getCurrentTheme(),
      currentLanguage: this.getCurrentLanguage(),
      availableThemes: this.getAvailableThemes(),
      availableLanguages: this.getAvailableLanguages()
    };
  }
}

export default new ThemeController();
