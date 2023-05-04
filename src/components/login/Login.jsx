import * as React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input , Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { login } from '../../utils/Route';

function Login() {
    const navigate = useNavigate();
    const handleSubmit = (values) => {
        login(values.username, values.password, navigate);
    }
    return (
        <div className="login">
            <div>
                <img src="#" alt="Logo" />
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
                        rules={[
                            {
                                required: true,
                                min: 2,
                                max: 15,
                                message: 'Please input your Username!(min:2,max:15)',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                min: 4,
                                max: 15,
                                message: 'Please input your Password!(min:4,max:15)',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
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