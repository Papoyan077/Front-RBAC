import { Table } from 'antd';
import { MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import SearchFunc from '../../search';
import { getEmployees } from '../../../utils/Route';

const Employees = () => {
    const [employeesData, employeesDataChange] = useState(null);
    const navigate = useNavigate();
    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
    const LoadDetail = (id) => {
        navigate("/layout/detail/" + id);
    }
    useEffect(() => {
      getEmployees(employeesDataChange);
    }, []);

  const [columns] = useState([
    {
      title : "Uername" ,
      dataIndex : "userName",
      ...SearchFunc('userName'),
    },
    {
        title : "FirstName" ,
        dataIndex : "firstName",
      },
      {
        title : "LastName" ,
        dataIndex : "lastName",
      },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className='actionsIcons'>
            <MoreOutlined onClick={() => { LoadDetail(record.id)}}/>
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
        <Table columns={columns} rowKey={updateIndex} dataSource={employeesData} scroll={{y : 350}} className='tableStyle'/>
    </div>
  )
};
export default Employees;