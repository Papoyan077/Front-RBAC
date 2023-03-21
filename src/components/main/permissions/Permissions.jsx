import { useState , useEffect } from "react";
import Table from 'react-bootstrap/Table';
import {Button} from "antd";
import AddPermission from "./AddPermission";
import instance from "../../../utils/axios";
const Permissions = () => {
    const [permissiondata, permissiondatachange] = useState(null);
    useEffect(() => {
        instance.get(`/permission/`)
        .then(resp => {
            permissiondatachange(resp.data);
        }).catch((err) => {
              console.log(err.message);
          })
    }, []);
    return (
        <div style={{display:"flex",flexDirection:"column",marginRight:"10px", marginTop:"10px",width:"100vw",height:"85vh"}}>
            <div className="card-title">
                <h2>Permissions</h2>
                <AddPermission />
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%"}}>
                <div style={{margin: "20px"}}>
                    <div className="card-body">
                        <Table size="sm">
                            <thead className="bgColor">
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>Module Title</th>
                                <th>Params</th>                            </tr>
                            </thead>
                            <tbody>
                            {permissiondata &&
                                permissiondata.map(item => (
                                    <tr className="tbBgc" key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>module array</td>
                                        <td>
                                            <Button>Edit</Button>
                                            <Button>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Permissions;













