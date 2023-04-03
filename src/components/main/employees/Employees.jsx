import { Table } from 'antd';
import { MoreOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import SearchFunc from '../../search';
import { getEmployees } from '../../../utils/Route';

const Employees = () => {
    const [employeesData, employeesDataChange] = useState(null);
    const navigate = useNavigate();

    const LoadDetail = (id) => {
        navigate("/general/detail/" + id);
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
          <>
            <MoreOutlined onClick={() => { LoadDetail(record.id)}} style={{fontSize : "25px"}} />
          </>
        );
      },
    },
  ]);

  return (
    <div style={{
        paddingLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        width: "100%",
        height: "85vh",
    }}>
        <div className="card-title">
            <h2>Employees</h2>
        </div>
        <Table columns={columns} dataSource={employeesData} scroll={{y : 350}} style={{width: "98%"}} />
    </div>
  )
};
export default Employees;