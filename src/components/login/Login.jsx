import * as React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { login } from '../../utils/Route';
import logo from "../../assets/Logo.png"

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        login(values.username, values.password, navigate);
    }
    return (
        <div className="login">
            <div>
                <img src={logo} alt="Logo" />
            </div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Login