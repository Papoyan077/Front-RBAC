import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getEmployeesById, getPermissions} from "../../../utils/Route";
import { ArrowLeftOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import EmpPermissionEdit from "./EmpPermissionEdit";
import {showDeleteConfirm} from "../../delete";
import instance from "../../../utils/axios";
import {getCookie} from "../../login/LoginAcces";
import {error} from "../../../utils/Messages";

const EmpDetail = () => {
    let empId = useParams();
    const [employeeData, setEmployeeData] = useState({});

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
    console.log(employeeData)

    const deleteEployeePermission = async (id) => {
        return (
            await instance.delete(`/employee/permission?employeeId=${employeeData.id}&permissionId=${id}`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } }).then(resp => {
                setEmployeeData(resp.data);
                return true
            }).catch((err) => {
                error(err.message)
                return false
            })
        )
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
                    <div className='icons'>
                        <DeleteOutlined  onClick={()=>deleteEployeePermission(record.id)} className='deleteIcons' />
                    </div>
                );
            },
        },
    ]
    return (
        <div className='main'>
            <div className='mainTitle'>
                <div className='mainTitleText'>
                    <Link
                        to="/employees"><Button>Back</Button>
                    </Link>
                    <div className='d-flex'>
                    <span className='d-flex'>Employee :</span>
                    {employeeData &&
                        <div>
                            <div className='d-flex'>
                                <span>{employeeData.firstName}</span>
                                <span className='ml-5'>{employeeData.lastName}</span>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className='mainDetail'>
                    <div className='detailMain'>
                        <span>
                            Permissions
                        </span>
                        <Button>Add Permissions</Button>
                    </div>
                    <div className='scroll'>
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
                <div className='mainDetail'>
                    <div className='detailMain'>
                        <span>
                            Roles
                        </span>
                        <Button>Add Roles</Button>
                    </div>
                    <div className='scroll'>
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