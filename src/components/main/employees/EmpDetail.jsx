import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getEmployeesById} from "../../../utils/Route";
import {ArrowLeftOutlined, UserOutlined} from "@ant-design/icons";
import {Table} from "antd";

const EmpDetail = () => {
    let empId = useParams();
    const [empData, empDataChange] = useState({});
    useEffect(() => {
        getEmployeesById(empDataChange, empId)
    }, [empId]);
    console.log(empData)
    let rolesData = empData.roles
    console.log(rolesData)
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'name',
        },
    ]
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
                }}>Employee :<UserOutlined style={{marginLeft: "15px"}}/></span>
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
            <div className="border-table" style={{width: "100%", height: "100%", overflow: "scroll"}}>
                <div style={{
                    marginLeft: "25px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            fontSize: "20px"
                        }}>
                            Permissions
                        </span>
                    <div style={{
                        width: "100%",
                        maxHeight: "70vh",
                        overflow: "scroll"
                    }}>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p
                                        style={{
                                            margin: 0,
                                        }}
                                    >
                                        {record.id}
                                    </p>
                                ),
                                rowExpandable: (record) => record.id !== 'Not Expandable',
                            }}
                            dataSource={empData.permissions}
                        />
                    </div>
                </div>
                <div style={{
                    marginLeft: "25px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            fontSize: "20px"
                        }}>
                            Roles
                        </span>
                    <div style={{
                        width: "100%",
                        maxHeight: "70vh",
                        overflow: "scroll"
                    }}>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <p
                                        style={{
                                            margin: 0,
                                        }}
                                    >
                                        {
                                            record.permissions.map((e)=>{
                                                return <span>{e.title},   </span>
                                            })
                                        }
                                    </p>
                                ),
                                rowExpandable: (record) => record.id !== 'Not Expandable',
                            }}
                            dataSource={rolesData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmpDetail;