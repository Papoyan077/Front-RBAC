import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { getCookie, setCookie } from '../login/LoginAcces';


export default function Header() {
    return (
        <div className="header">
            <div className="border-table headerDirection">
                <div>INSTIGATE MOBILE</div>
                <div className="headerButton">
                    <Link to='/login'>
                        <Button onClick={() => {
                            setCookie('token', null, null);
                            getCookie('token');
                        }} type={"text"}><LogoutOutlined /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
