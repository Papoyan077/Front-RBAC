import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { deleteEmployeePermission } from "../../delete";

const EmployeePermissions = ({ employeeData, render, setRender }) => {
    let permissions = employeeData.permissions

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
    permissions &&
        permissions.map((first) => {
            first.key = `permissions${updateIndex()}`
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
                        <DeleteOutlined onClick={() => deleteEmployeePermission(record.id, employeeData , render , setRender)} className='deleteIcons' />
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
    );
}
export default EmployeePermissions;