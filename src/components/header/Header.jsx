import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";


export default function Header() {
    return (
        <div style={{width: "100%", height: "60px"}}>
            <div className="border-table" style={{display:"flex" , justifyContent:"space-between" , alignItems:"center" , padding: "0 10px" , width:"100%" }}>
                <div>INSTIGATE MOBILE</div>
                <div style={{display: "flex" , height: "50px",alignItems: "center"}}>
                    <Link style={{marginLeft: "10px",width:"100%",listStyle:"none"}} to='/'>
                        <Button style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px"}} type={"text"}><LogoutOutlined /></Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
