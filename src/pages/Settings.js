import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext';

const Settings = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useApp();
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  
  // User info form
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    fullName: ''
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Settings
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'vi'
  });

  useEffect(() => {
    if (state.user) {
      setUserInfo({
        username: state.user.username || '',
        email: state.user.email || '',
        fullName: state.user.fullName || ''
      });
    }
    setSettings({
      theme: state.theme,
      language: state.language
    });
  }, [state.user, state.theme, state.language]);

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (userInfo.username && userInfo.email && userInfo.fullName) {
      const updatedUser = {
        ...state.user,
        username: userInfo.username,
        email: userInfo.email,
        fullName: userInfo.fullName
      };
      dispatch({ type: 'LOGIN', payload: updatedUser });
      showAlert('Cập nhật thông tin thành công!');
    } else {
      showAlert('Vui lòng nhập đầy đủ thông tin', 'danger');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      showAlert('Mật khẩu xác nhận không khớp', 'danger');
      return;
    }
    if (passwordForm.oldPassword && passwordForm.newPassword) {
      setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
      showAlert('Đổi mật khẩu thành công!');
    } else {
      showAlert('Vui lòng nhập đầy đủ thông tin', 'danger');
    }
  };

  const handleThemeChange = (theme) => {
    setSettings({ ...settings, theme });
    dispatch({ type: 'SET_THEME', payload: theme });
    showAlert('Đã thay đổi chế độ hiển thị!');
  };

  const handleLanguageChange = (language) => {
    setSettings({ ...settings, language });
    dispatch({ type: 'SET_LANGUAGE', payload: language });
    showAlert('Đã thay đổi ngôn ngữ!');
  };

  if (!state.isAuthenticated) {
    return (
      <div className="p-4">
        <Card className="text-center py-5">
          <Card.Body>
            <i className="fas fa-lock fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Cần đăng nhập</h4>
            <p className="text-muted">
              Bạn cần đăng nhập để truy cập phần cài đặt.
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-primary">
          <i className="fas fa-cog me-2"></i>
          {t('settings.title')}
        </h2>
        <p className="text-muted">Quản lý thông tin cá nhân và cài đặt ứng dụng</p>
      </div>

      {alert.show && (
        <Alert 
          variant={alert.variant} 
          onClose={() => setAlert({ show: false, message: '', variant: 'success' })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Tabs defaultActiveKey="profile" className="mb-4">
        {/* User Information Tab */}
        <Tab eventKey="profile" title={
          <span>
            <i className="fas fa-user me-2"></i>
            {t('settings.userInfo')}
          </span>
        }>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-user-edit me-2"></i>
                {t('settings.updateProfile')}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUserInfoSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth.username')}</Form.Label>
                      <Form.Control
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth.email')}</Form.Label>
                      <Form.Control
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>{t('auth.fullName')}</Form.Label>
                  <Form.Control
                    type="text"
                    value={userInfo.fullName}
                    onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="fas fa-save me-1"></i>
                  {t('common.save')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* Change Password Tab */}
        <Tab eventKey="password" title={
          <span>
            <i className="fas fa-key me-2"></i>
            {t('settings.changePassword')}
          </span>
        }>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-lock me-2"></i>
                {t('auth.changePasswordTitle')}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('auth.oldPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('auth.newPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>{t('auth.confirmNewPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmNewPassword: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="fas fa-save me-1"></i>
                  {t('common.save')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        {/* App Settings Tab */}
        <Tab eventKey="app" title={
          <span>
            <i className="fas fa-cog me-2"></i>
            Cài đặt ứng dụng
          </span>
        }>
          <Row>
            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-palette me-2"></i>
                    {t('settings.theme')}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex gap-3">
                    <Button
                      variant={settings.theme === 'light' ? 'primary' : 'outline-primary'}
                      onClick={() => handleThemeChange('light')}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-sun me-2"></i>
                      {t('settings.lightMode')}
                    </Button>
                    <Button
                      variant={settings.theme === 'dark' ? 'primary' : 'outline-primary'}
                      onClick={() => handleThemeChange('dark')}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-moon me-2"></i>
                      {t('settings.darkMode')}
                    </Button>
                  </div>
                  <small className="text-muted mt-2 d-block">
                    Chọn chế độ hiển thị phù hợp với bạn
                  </small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <i className="fas fa-language me-2"></i>
                    {t('settings.language')}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex gap-3">
                    <Button
                      variant={settings.language === 'vi' ? 'primary' : 'outline-primary'}
                      onClick={() => handleLanguageChange('vi')}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-flag me-2"></i>
                      {t('settings.vietnamese')}
                    </Button>
                    <Button
                      variant={settings.language === 'en' ? 'primary' : 'outline-primary'}
                      onClick={() => handleLanguageChange('en')}
                      className="d-flex align-items-center"
                    >
                      <i className="fas fa-flag me-2"></i>
                      {t('settings.english')}
                    </Button>
                  </div>
                  <small className="text-muted mt-2 d-block">
                    Chọn ngôn ngữ hiển thị của ứng dụng
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional Settings */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-info-circle me-2"></i>
                Thông tin ứng dụng
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Phiên bản:</strong> 1.0.0
                  </div>
                  <div className="mb-3">
                    <strong>Ngày tạo:</strong> {new Date().toLocaleDateString('vi-VN')}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <strong>Framework:</strong> React.js
                  </div>
                  <div className="mb-3">
                    <strong>UI Library:</strong> Bootstrap 5
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settings;
