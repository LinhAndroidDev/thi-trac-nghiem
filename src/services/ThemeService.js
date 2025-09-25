// Theme Service
class ThemeService {
  constructor() {
    this.currentTheme = this.getStoredTheme();
    this.currentLanguage = this.getStoredLanguage();
  }

  // Theme management
  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('quizTheme', theme);
    this.applyTheme(theme);
  }

  getStoredTheme() {
    return localStorage.getItem('quizTheme') || 'light';
  }

  applyTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    return newTheme;
  }

  // Language management
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('quizLanguage', language);
  }

  getStoredLanguage() {
    return localStorage.getItem('quizLanguage') || 'vi';
  }

  // Available options
  getAvailableThemes() {
    return [
      { value: 'light', label: 'Light', icon: 'fas fa-sun' },
      { value: 'dark', label: 'Dark', icon: 'fas fa-moon' }
    ];
  }

  getAvailableLanguages() {
    return [
      { value: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
      { value: 'en', label: 'English', flag: '🇺🇸' }
    ];
  }

  // Initialize
  initialize() {
    this.applyTheme(this.currentTheme);
    return {
      theme: this.currentTheme,
      language: this.currentLanguage
    };
  }

  // Reset to defaults
  reset() {
    this.setTheme('light');
    this.setLanguage('vi');
    return this.initialize();
  }
}

// Export singleton instance
export default new ThemeService();
