import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { deleteEmployeeRole } from "../../delete";

const EmployeeRoles = ({ employeeData, render , setRender}) => {
    let rolesData = employeeData.roles

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    rolesData &&
        rolesData.map((first) => {
            first.key = `rolesData${updateIndex()}`
        })


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
                        <DeleteOutlined onClick={() => deleteEmployeeRole(record.id, employeeData , render , setRender)} className='deleteIcons' />
                    </div>
                );
            },
        },
    ]
    return (
        <div className='scroll'>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <p style={{ margin: 0 }}>
                            {
                                record.permissions.map((e) => {
                                    return <span key={`roles${updateIndex()}`}>{e.title},  </span>
                                })
                            }
                        </p>
                    ),
                    rowExpandable: (record) => record.id !== 'Not Expandable',
                }}
                dataSource={rolesData}
                loading={rolesData ? false : true}
            />
        </div>
    );
}
export default EmployeeRoles;