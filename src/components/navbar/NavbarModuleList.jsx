import React from 'react'
import {Link} from 'react-router-dom';
import {Button} from "antd";

export default function HeaderModuleList() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Link style={{width:"70%"}} to={"employees"}>
                <Button className="btnStyle" type="text">Employees</Button>
            </Link>
            <Link style={{width:"70%"}} to={"clients"}>
                <Button className="btnStyle" type="text">Clients</Button>
            </Link>
            <Link style={{width:"70%"}} to={"actions"}>
                    <Button className="btnStyle" type="text">Actions</Button>
            </Link>
            <Link style={{width:"70%"}} to={"policies"}>
                    <Button className="btnStyle" type="text">Policies</Button>
            </Link>
            <Link style={{width:"70%"}} to={"modules"}>
                <Button className="btnStyle" type="text">Modules</Button>
            </Link>
            <Link style={{width:"70%"}}  to={"permissions"}>
                <Button className="btnStyle" type="text">Permissions</Button>
            </Link>
            <Link style={{width:"70%"}} to={"roles"}>
                <Button className="btnStyle" type="text">Roles</Button>
            </Link>
        </div>
    )
}




