import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import {Button} from "antd";
import AddRole from "./AddRole"
import instance from "../../../utils/axios";
const Roles = () => {
    const [Roledata, Roledatachange] = useState(null);
    useEffect(() => {
        instance.get(`/role/`)
            .then(resp => {
                Roledatachange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "10px",
            marginTop: "10px",
            width: "100vw",
            height: "85vh"
        }}>
            <div className="card-title">
                <h2>Roles</h2>
                <AddRole>Add</AddRole>
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%"}}>
                <div style={{margin: "20px"}}>
                    <div className="card-body">
                        <Table size="sm">
                            <thead className="bgColor">
                            <tr>
                                <th>ID</th>
                                <th>title</th>
                                <th>Permissions</th>
                                <th>Params</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Roledata &&
                                Roledata.map(item => (
                                    <tr className="tbBgc" key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>from array [updatemodule , deletebutton , .....]</td>
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

export default Roles;