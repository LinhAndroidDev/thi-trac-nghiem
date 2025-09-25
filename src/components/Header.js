import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  // Change password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const showAlert = (message, variant = 'success') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'success' }), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation - in real app, this would be API call
    if (loginForm.username && loginForm.password) {
      const user = {
        id: 1,
        username: loginForm.username,
        email: loginForm.email || 'user@example.com',
        fullName: loginForm.username,
        joinDate: new Date().toISOString()
      };
      dispatch({ type: 'LOGIN', payload: user });
      setShowLogin(false);
      setLoginForm({ username: '', password: '' });
      showAlert(t('auth.loginSuccess'));
    } else {
      showAlert('Vui lòng nhập đầy đủ thông tin', 'danger');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      showAlert('Mật khẩu xác nhận không khớp', 'danger');
      return;
    }
    if (registerForm.username && registerForm.email && registerForm.password) {
      const user = {
        id: Date.now(),
        username: registerForm.username,
        email: registerForm.email,
        fullName: registerForm.fullName,
        joinDate: new Date().toISOString()
      };
      dispatch({ type: 'LOGIN', payload: user });
      setShowRegister(false);
      setRegisterForm({ username: '', email: '', fullName: '', password: '', confirmPassword: '' });
      showAlert(t('auth.registerSuccess'));
    } else {
      showAlert('Vui lòng nhập đầy đủ thông tin', 'danger');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      showAlert('Mật khẩu xác nhận không khớp', 'danger');
      return;
    }
    if (passwordForm.oldPassword && passwordForm.newPassword) {
      setShowChangePassword(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
      showAlert(t('auth.passwordChanged'));
    } else {
      showAlert('Vui lòng nhập đầy đủ thông tin', 'danger');
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    showAlert(t('auth.logoutSuccess'));
  };

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
            {state.isAuthenticated ? (
              <>
                <Nav.Link href="#profile">
                  <i className="fas fa-user me-1"></i>
                  {state.user?.fullName || state.user?.username}
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

export default Header;
