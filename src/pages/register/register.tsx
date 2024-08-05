import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUser } from './service/useRegisterUser';
import { RegisterType } from '../../types';
import Swal from 'sweetalert2';

export const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { mutate, isPending } = useRegisterUser();
  const navigate = useNavigate();

  const onFinish = (values: RegisterType) => {
    mutate(values, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          showConfirmButton: false,
          timer: 1500
        })
        form.resetFields();
        navigate('/login', { replace: true });
      },
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Registration failed! Please try again.',
          timer: 1500
        })
      },
    });
  };

  return (
    <Row justify="center" align="middle" className="register-page">
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Form
          form={form}
          name="normal_register"
          className="register-form"
          initialValues={{ 
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            confirm_password: ""
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
            rules={[{ required: true, message: 'Please input your First Name!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            className='input'
            rules={[{ required: true, message: 'Please input your Last Name!' }]}
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

          <Form.Item
            className='input'
            name="confirm_password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button" loading={isPending}>
              Register
            </Button>
          </Form.Item>
          <Typography style={{ textAlign: 'center' }}>
            Already have an account?
            <Link to="/login"> Login</Link>
          </Typography>
        </Form>
      </Col>
    </Row>
  );
};
