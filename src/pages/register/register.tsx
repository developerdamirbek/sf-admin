import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUser } from './service/useRegisterUser';
import { RegisterType } from '../../types';

export const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const onFinish = (values: RegisterType) => {
    mutate(values, {
      onSuccess: () => {
        message.success('Registration successful!');
        form.resetFields();
        navigate('/login', { replace: true });
      },
      onError: (error) => {
        message.error(error?.message || 'Registration failed. Please try again.');
      },
    });
  };

  return (
    <Row justify="center" align="middle" className="login-page">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          form={form}
          name="normal_register"
          className="login-form"
          initialValues={{ 
            first_name: "",
            last_name: "",
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
            name="first_name"
            className='input'
            rules={[{ required: true, message: 'Please input your Firstname!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            className='input'
            rules={[{ required: true, message: 'Please input your Lastname!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="username"
            className='input'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            className='input'
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
            <Button type="primary" htmlType="submit" className="login-form-button" loading={isPending}>
              Register
            </Button>
          </Form.Item>
          <Typography style={{ textAlign: 'center' }}>
            Already have an account
            <Link to="/login"> Login</Link>
          </Typography>
        </Form>
      </Col>
    </Row>
  );
};
