import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { CoffeeOutlined, TeamOutlined } from '@ant-design/icons';

const { Header } = Layout;

const menuItems = [
  { key: '/cafes', label: 'Cafe', icon: <CoffeeOutlined /> },
  { key: '/employees', label: 'Employee', icon: <TeamOutlined /> },
];

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = menuItems.find(item => location.pathname.startsWith(item.key))?.key || '/cafes';

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ 
          color: 'white', 
          fontWeight: '700', 
          marginRight: '24px',
          fontSize: '20px',
          letterSpacing: '0.5px',
          fontFamily: 'Georgia, serif'
      }}>
          ☕ CafeManager
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
}

export default AppHeader;