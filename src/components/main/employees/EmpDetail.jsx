import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployeesById } from "../../../utils/Route";
import { ArrowLeftOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import EmpPermissionEdit from "./EmpPermissionEdit";

const EmpDetail = () => {
    let empId = useParams();
    const [employeeData, setEmployeeData] = useState({});

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    useEffect(() => {
        getEmployeesById(setEmployeeData, empId)
    }, [empId]);
    let rolesData = employeeData.roles
    console.log(employeeData);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'name',
        },
        {
            render: (record) => {
                return (
                    <div className='EmployeesIcons'>
                        <DeleteOutlined className='deleteIcons' />
                    </div>
                );
            },
        },
    ]
    return (
        <div className='main'>
            <div className='mainTitle'>
                <div style={{ display: "flex", alignItems: "center", height: "50px" }}>
                    <Link style={{ display: "flex", alignItems: "center" }}
                        to="/layout/employees"><Button type="primary">Back</Button>
                    </Link>
                    <span style={{
                        marginLeft: "10px",
                        display: "flex",
                        alignItems: "center"
                    }}>Employee :</span>
                    {employeeData &&
                        <div>
                            <div style={{ display: "flex" }}>
                                <span>{employeeData.firstName}</span>
                                <span style={{ marginLeft: "5px" }}>{employeeData.lastName}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="border-table" style={{ width: "100%", height: "100%", overflow: "scroll" }}>
                <div style={{
                    margin: "5px auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "98%"

                }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <span style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px"
                        }}>
                            Permissions
                        </span>
                        <Button type="primary">Add Permissions</Button>
                    </div>
                    <div style={{
                        width: "100%",
                        maxHeight: "70vh",
                        overflow: "scroll"
                    }}>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => (
                                    record.policies?.map((item => {
                                        return (
                                            <p style={{ margin: 0 }} key={item.id}>
                                                {item.policyModule.title}
                                            </p>
                                        )
                                    }))
                                ),
                                rowExpandable: (record) => record.id !== 'Not Expandable',
                            }}
                            dataSource={employeeData.permissions}
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
                                    <p style={{ margin: 0 }}>
                                        {
                                            record.permissions.map((e) => {
                                                return <span>{e.title},  </span>
                                            })
                                        }
                                    </p>
                                ),
                                rowExpandable: (record) => record.id !== 'Not Expandable',
                            }}
                            dataSource={rolesData}
                            rowKey={"ID"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default EmpDetail;