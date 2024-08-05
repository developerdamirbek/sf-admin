import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { usePostUser } from './service/usePostUser';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

type FieldType = {
  username: string;
  password: string;
};

export const Login: React.FC = () => {

  const navigate = useNavigate();
  const { mutate, isPending } = usePostUser();

  React.useEffect(() => {
    if (Cookies.get("token")) {
      navigate('/', { replace: true });
    }
  }, []); 

  const onFinish = (values: FieldType) => {
    mutate(values, {
      onSuccess: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Login successful!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/", { replace: true });
        Cookies.set("token", res.token, { expires: 7 });
      },
      onError: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect Password or Username!'
        });
      }
    });
  };

  return (
    <Row justify="center" align="middle" className="login-page">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ 
            username: "",
            password: ""
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="logo">
            <img src="/logo.png" alt="logo" width={80} />
          </div>
          <Form.Item
            name="username"
            className="input"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            className="input"
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={isPending} htmlType="submit" className="login-form-button">
              Login
            </Button>
          </Form.Item>
          <Typography style={{ textAlign: 'center' }}>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </Typography>
        </Form>
      </Col>
    </Row>
  );
};
