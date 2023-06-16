import * as React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { login } from '../../utils/Route';
import logo from "../../assets/logo.png"

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        login(values.username, values.password, navigate);
    }
    return (
        <div className="login">
            <div className='loginBqg'>
            <div className='m-15'>
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div>
            <Form
                name="normal_login"
                className="loginForm"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    className="m-5"
                    label='Username'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                </Form.Item>
                <Form.Item
                    name="password"
                    className="m-5"
                    label='Password'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                    />
                </Form.Item>

                <Form.Item
                className="m-5"
                >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Login