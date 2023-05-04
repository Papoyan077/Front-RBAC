import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";


export default function Header() {
    return (
        <div className="header">
            <div className="border-table headerDirection">
                <div>INSTIGATE MOBILE</div>
                <div className="headerButton">
                    <Link to='/'>
                        <Button type={"text"}><LogoutOutlined /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
