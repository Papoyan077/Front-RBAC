import {useEffect, useState} from "react";
import {Button} from "antd";
import Table from 'react-bootstrap/Table';
import AddClient from "./AddClient";
import instance from "../../../utils/axios";
const Clients = () => {
        const [clientData, clientDataChange] = useState(null);

        useEffect(() => {
            instance.get('/client/').then(resp => {
                clientDataChange(resp.data);
            }).catch((err) => {
                console.log(err.message);
            });
        }, []);

        const deleteClient = (id) => {
            clientDataChange(clientData.filter((item) => item.id !== id));
            instance.delete(`/client/${id}`)
                .then(res => {
                    console.log('DELETED RECORD::::', res)
                })
                .catch(err => console.log(err))
        };
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
                marginTop: "10px",
                width: "100vw",
                height: "85vh",
            }}>
                <div className="card-title">
                    <h2>Clients</h2>
                    <AddClient/>
                </div>
                <div className="border-blue" style={{width: "100%", height: "100%",overflow: "scroll"}}>
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

                                {clientData &&
                                    clientData.map(item => (
                                        <tr className="tbBgc" key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td style={{display: "flex", justifyContent: "flex-end"}}>
                                                <div style={{width: "25%"}}>
                                                    <Button className="btnStyle" type="text">Edit</Button></div>
                                                <div style={{width: "25%"}}><Button className="btnStyle"
                                                                                    type="text" onClick={() => deleteClient(item.id)}>Delete</Button>
                                                </div>
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


export default Clients;