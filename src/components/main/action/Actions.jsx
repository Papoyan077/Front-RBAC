import {useEffect, useState} from "react";
import {Button} from "antd";
import Table from 'react-bootstrap/Table';
import instance from "../../../utils/axios";
import UpdateAction from "./UpdateAction";
import AddAction from "./AddAction";

const Actions = () => {
    const [render, setRender] = useState(false);
    const [ActionsData, ActionsDataChange] = useState(null);

    useEffect(() => {
        instance.get('/action/').then(resp => {
            ActionsDataChange(resp.data);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [render]);
    const deleteAction = (id) => {
        ActionsDataChange(ActionsData.filter((item) => item.id !== id));
        instance.delete(`/action/${id}`)
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
            height: "85vh"
        }}>
            <div className="card-title">
                <h2>Actions</h2>
                <AddAction render={render} setRender={setRender}/>
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%", overflow: "scroll"}}>
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
                            {ActionsData &&
                                ActionsData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td style={{display: "flex", justifyContent: "flex-end"}}>
                                            <Button style={{width:"15%"}} className="btnStyle"
                                                    type="text" onClick={() => deleteAction(item.id)}>Delete</Button>
                                            <UpdateAction render={render} setRender={setRender} id={item.id} />

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