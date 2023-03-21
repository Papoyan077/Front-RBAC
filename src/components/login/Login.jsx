import * as React from 'react';
import {Link} from 'react-router-dom';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button,  Form, Input} from 'antd';
function Login() {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100vw",height:"100vh"}}>
            <div>
                <h1 style={{color:"#4096ff"}}>LOGIN</h1>
            </div>
            <div style={{backgroundColor:"white", width:"30vw"}} className="border-blue">
                <div style={{margin:"5%"}}>
                    <Form
                        name="normal_login"
                        className="login-form"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                            <Link to={"/general/employees"}> <Button type="dashed" htmlType="submit" className="login-form-button">
                                Log in
                            </Button></Link>
                        </Form.Item>
                    </Form></div></div></div>
    )
}

export default Login