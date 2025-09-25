// Header Component - MVC Pattern
import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AuthController from '../controllers/AuthController';

const HeaderMVC = ({ onAuthChange, onThemeChange, onLanguageChange }) => {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Form states
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '', email: '', fullName: '', password: '', confirmPassword: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '', newPassword: '', confirmNewPassword: ''
  });

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await AuthController.login(loginForm);
      if (result.success) {
        setShowLogin(false);
        setLoginForm({ username: '', password: '' });
        showAlert(result.message);
        onAuthChange();
      } else {
        showAlert(result.errors.join(', '), 'danger');
      }
    } catch (error) {
      showAlert('Có lỗi xảy ra khi đăng nhập', 'danger');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await AuthController.register(registerForm);
      if (result.success) {
        setShowRegister(false);
        setRegisterForm({ username: '', email: '', fullName: '', password: '', confirmPassword: '' });
        showAlert(result.message);
        onAuthChange();
      } else {
        showAlert(result.errors.join(', '), 'danger');
      }
    } catch (error) {
      showAlert('Có lỗi xảy ra khi đăng ký', 'danger');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const result = await AuthController.changePassword(passwordForm);
      if (result.success) {
        setShowChangePassword(false);
        setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        showAlert(result.message);
      } else {
        showAlert(result.errors.join(', '), 'danger');
      }
    } catch (error) {
      showAlert('Có lỗi xảy ra khi đổi mật khẩu', 'danger');
    }
  };

  const handleLogout = () => {
    const result = AuthController.logout();
    if (result.success) {
      showAlert(result.message);
      onAuthChange();
    }
  };

  const currentUser = AuthController.getCurrentUser();
  const isAuthenticated = AuthController.isAuthenticated();

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">
          <i className="fas fa-graduation-cap me-2"></i>
          Quiz System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link href="#profile">
                  <i className="fas fa-user me-1"></i>
                  {currentUser.getDisplayName()}
                </Nav.Link>
                <Nav.Link onClick={() => setShowChangePassword(true)}>
                  <i className="fas fa-key me-1"></i>
                  {t('auth.changePassword')}
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>
                  {t('common.logout')}
                </Nav.Link>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-light" 
                  className="me-2"
                  onClick={() => setShowLogin(true)}
                >
                  <i className="fas fa-sign-in-alt me-1"></i>
                  {t('common.login')}
                </Button>
                <Button 
                  variant="light"
                  onClick={() => setShowRegister(true)}
                >
                  <i className="fas fa-user-plus me-1"></i>
                  {t('common.register')}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {alert.show && (
        <Alert 
          variant={alert.variant} 
          className="position-fixed" 
          style={{ top: '80px', right: '20px', zIndex: 9999 }}
          onClose={() => setAlert({ show: false, message: '', variant: 'success' })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('auth.loginTitle')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleLogin}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.username')}</Form.Label>
              <Form.Control
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.password')}</Form.Label>
              <Form.Control
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLogin(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('common.login')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('auth.registerTitle')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRegister}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.username')}</Form.Label>
              <Form.Control
                type="text"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.email')}</Form.Label>
              <Form.Control
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.fullName')}</Form.Label>
              <Form.Control
                type="text"
                value={registerForm.fullName}
                onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.password')}</Form.Label>
              <Form.Control
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('auth.confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRegister(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('common.register')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal show={showChangePassword} onHide={() => setShowChangePassword(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('auth.changePasswordTitle')}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleChangePassword}>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowChangePassword(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('common.save')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default HeaderMVC;
