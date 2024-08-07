import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Modal, theme, Button } from 'antd';
import './style.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { menu } from './data/menu';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const { confirm } = Modal;
const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  if (!token) {
    window.location.replace("/login");
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = menu.map(item => ({
    key: item.id,
    icon: <item.icon />,
    label: item.name,
    onClick: () => navigate(item.path),
  }));

  const showConfirm = () => {
    confirm({
      title: 'Do you want to log out?',
      icon: <ExclamationCircleFilled />,
      cancelText: 'No',
      onOk() {
        Cookies.remove("token");
        navigate("/login");
        Swal.fire({
          icon: 'info',
          title: 'You are logged out',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  };

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className='layout'>
      <Sider className='sidebar' trigger={null} collapsible collapsed={collapsed}>
        <div className='logo-block' style={{ padding: '16px', textAlign: 'center' }}>
          <img src="../../public/logo.png" alt="logo" width={collapsed ? 60 : 60} />
          {!collapsed && <h3 className='logo-title' >Smart Fleet</h3>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
        <div style={{ position: 'absolute', bottom: '0', width: '100%', padding: '16px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '8px', paddingLeft: '24px' }}>
           <LogoutOutlined onClick={showConfirm} style={{ fontSize: 18, color: "black" }} /> Logout
        </div>
      </Sider>
      <Layout>
        <Header  style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

