import React from 'react';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: 'home',
      label: t('common.home'),
      icon: 'fas fa-home',
      path: '#home'
    },
    {
      id: 'history',
      label: t('common.history'),
      icon: 'fas fa-history',
      path: '#history'
    },
    {
      id: 'statistics',
      label: t('common.statistics'),
      icon: 'fas fa-chart-bar',
      path: '#statistics'
    },
    {
      id: 'settings',
      label: t('common.settings'),
      icon: 'fas fa-cog',
      path: '#settings'
    }
  ];

  return (
    <div className="sidebar bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="text-muted mb-3">
          <i className="fas fa-bars me-2"></i>
          Menu
        </h5>
        <Nav className="flex-column">
          {menuItems.map((item) => (
            <Nav.Item key={item.id}>
              <Nav.Link
                href={item.path}
                className={`d-flex align-items-center py-2 px-3 rounded ${
                  activeTab === item.id ? 'bg-primary text-white' : 'text-dark'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                style={{ textDecoration: 'none' }}
              >
                <i className={`${item.icon} me-3`} style={{ width: '20px' }}></i>
                {item.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
