import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "antd";
import {
    MobileOutlined,
    UserOutlined
} from '@ant-design/icons';

export default function Header() {
    return (
        <div style={{padding:"10px ", width:"100%", height:"80px"}}>
            <div className="border-blue" style={{padding: "0 10px" , display:"flex",justifyContent:"space-between",alignItems:"center", height:"100%",width:"100%" }}>
                <div style={{color:"#4096ff",marginLeft:'5vw'}}> <UserOutlined /><MobileOutlined />INSTIGATE MOBILE</div>
                <div style={{display : "flex",width:"10vw"}}>
                    <Link style={{marginLeft: "10px",width:"100%",listStyle:"none"}} to='/'>
                        <Button className="btnLogout" type="text">Logout</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
