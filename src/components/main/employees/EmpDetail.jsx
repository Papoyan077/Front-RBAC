import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getEmployeesById} from "../../../utils/Route";
import {ArrowLeftOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import {Table} from "antd";
import EmpPermissionEdit from "./EmpPermissionEdit";
import EmpRoleEdit from "./EmpRoleEdit";

const EmpDetail = () => {
    let empId = useParams();
    const [empData, empDataChange] = useState({});

    useEffect(() => {
        getEmployeesById(empDataChange, empId)
    }, [empId]);

    const dataSource = empData.permissions

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },]
    console.log(empData);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "10px",
            marginTop: "10px",
            width: "100vw",
            height: "85vh"
        }}>
            <div style={{display: "flex", alignItems: "center", fontSize: "30px", marginLeft: "10px"}}>
                <Link style={{display: "flex", alignItems: "center"}}
                      to="/general/employees"><ArrowLeftOutlined/></Link>
                <span style={{
                    marginLeft: "10px",
                    display: "flex",
                    alignItems: "center"
                }}>Employee :<UserOutlined style={{marginLeft:"15px"}}/></span>
                {empData &&
                    <div>
                        <div style={{display: "flex"}}>
                            <span>{empData.firstName}</span>
                            <span style={{marginLeft: "5px"}}>{empData.lastName}</span>
                            <span style={{color: "lightgrey", marginLeft: "5px"}}>{empData.userName}</span>
                        </div>
                    </div>
                }
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%", overflow: "scroll"}}>
                <div style={{display: "flex", justifyContent:"space-around", margin: "10px"}}>

                    <div style={{
                        marginLeft: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <span style={{display:"flex",alignItems:"center",justifyContent:"center", width: "100%", fontSize: "20px"}}>
                            Permissions
                            <EmpPermissionEdit/>
                        </span>
                        <div style={{
                            width: "30vw",
                            maxHeight: "50vh",
                            overflow: "scroll"
                        }}>
                            <div style={{paddingLeft: "25px"}}></div>
                            <Table pagination={false} dataSource={dataSource} columns={columns}/>
                        </div>
                    </div>
                    <div style={{
                        marginLeft: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <span style={{display:"flex",alignItems:"center",justifyContent:"center", width: "100%", fontSize: "20px"}}>
                            Roles
                            <EmpRoleEdit/>
                        </span>
                        <div style={{
                            width: "30vw",
                            maxHeight: "50vh",
                            overflow: "scroll"
                        }}>
                            <div style={{paddingLeft: "25px"}}></div>
                            <Table pagination={false} dataSource={dataSource} columns={columns}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmpDetail;