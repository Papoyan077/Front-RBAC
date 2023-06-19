import { Table } from 'antd';
import { MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import SearchFunc from '../../search';
import { getEmployees } from '../../../utils/Route';

const Employees = () => {
  const [employeesData, setEmployeesData] = useState(null);
  const navigate = useNavigate();
  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }
  const LoadDetail = (id) => {
    navigate("/detail/" + id);
  }
  useEffect(() => {
    getEmployees(setEmployeesData)
  }, []);
  console.log(employeesData);

  const [columns] = useState([
    {
      title: "Uername",
      dataIndex: "userName",
      ...SearchFunc('userName'),
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      ...SearchFunc('firstName'),
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      ...SearchFunc('lastName'),
    },
    // {
    //   title: "Temporary Permission",
    //   dataIndex: "permissions",
    //   // ...SearchFunc('lastName'),
    // },
    {
      title: "Temporary Permissions",
      render: (record) => {
        return (
          <div className='tempPermissionTitle'>
            {record.permissions?.map(item => {
              return (
                <span key={`permission${updateIndex()}`}>{item.title},</span>
              )
            })}
          </div>
        )
      }
    },
    {
      render: (record) => {
        return (
          <div className='actionsIcons'>
            <MoreOutlined onClick={() => { LoadDetail(record.id) }} />
          </div>
        );
      },
    },
  ]);

  return (
    <div className='main'>
      <div className="mainTitle">
        <span>Employees</span>
      </div>
      <Table columns={columns} rowKey={updateIndex} dataSource={employeesData} scroll={{ y: 445 }} loading={employeesData ? false : true} className='tableStyle' />
    </div>
  )
};
export default Employees;