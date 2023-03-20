import { useEffect, useState } from "react";
import {Button} from "antd";
import Table from 'react-bootstrap/Table';
import instance from "../../../utils/axios";
import AddClient from "../client/AddClient";

const Actions = () => {
    const [Actionsdata, Actionsdatachange] = useState(null);

    useEffect(() => {
        instance.get('/action/').then(resp => {
            Actionsdatachange(resp.data);
        }).catch((err) => {
            console.log(err.message);
        });
    }, []);
    return (
        <div style={{display:"flex",flexDirection:"column",marginRight:"10px", marginTop:"10px",width:"100vw",height:"85vh"}}>
            <div className="card-title">
                <h2>Clients</h2>
                <AddClient />
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%"}}>
                <div style={{margin: "20px"}}>
                    <div className="card-body">
                        <Table size="sm">
                            <thead className="bgColor">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Params</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Actionsdata &&
                                Actionsdata.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>
                                            <Button>Delete</Button>
                                            <Button>Update</Button>
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

export default Actions;