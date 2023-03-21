import { useEffect, useState } from "react";
import instance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import {Button} from "antd";
const Employees = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/general/detail/" + id);
    }
    useEffect(() => {
          instance.get(`/employees/`)
          .then(resp => {
              empdatachange(resp.data);
          }).catch((err) => {
                console.log(err.message);
            })
    }, []);
    console.log(empdata);
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
                <h2>Employees</h2>
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%"}}>
                <div style={{margin: "20px"}}>
                    <div className="card-body">
                        <Table size="sm">
                            <thead className="bgColor">
                            <tr>
                                <th>ID</th>
                                <th>username</th>
                                <th>firstName</th>
                                <th>lastname</th>
                                <th>Param</th>
                            </tr>
                            </thead>
                            <tbody>
                            {empdata &&
                                empdata.map(item => (
                                    <tr className="tbBgc" key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.username}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>
                                            <a onClick={() => {
                                                LoadDetail(item.id)
                                            }}><Button className="btnStyle" type="text">Details</Button></a>
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
export default Employees;