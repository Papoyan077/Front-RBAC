import { Table , Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from "@ant-design/icons";
import AddPermission from "./AddPermission"
import instance from '../../../utils/axios';
import UpdatePermission from './UpdatePermission';
import SearchFunc from '../../search';
import { getPermissions } from '../../../utils/Route';
const { confirm } = Modal;

const Permissions = () => {
    const [render, setRender] = useState(false);
    const [permissionData, permissionDataChange] = useState(null);
    useEffect(() => {
        getPermissions(permissionDataChange);
    }, [render]);

    

  const [columns] = useState([
    {
      title : "Title" ,
      dataIndex : "title",
      ...SearchFunc('title'),
    },
    {
        title : "Policy Modules",
        render: (record) => {
            return (
            <>
                {record.policies?.map(policy => {
                    return (
                        <span>{policy.policyModule.title}</span>
                    )
                })}
            </>
            )
        }
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <UpdatePermission titl={record.title} render={render} setRender={setRender} id={record.id}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record) }} style={{ color: "red", marginLeft: 12 }}/>
          </>
        );
      },
    },
  ]);

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure delete this action?',
      icon: <ExclamationCircleFilled />,
      content: `Action name is (${record.title}):`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        permissionDataChange((permission) => {
          return permission.filter((item) => item.id !== record.id);
        });
        instance.delete(`/permission/${record.id}`)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
      },
      onCancel() {
            console.log("Deletion pcrocess is canceled");
      },
    });
  };

  return (
    <div style={{
        paddingLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        width: "100%",
        height: "85vh",
    }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"25px",marginRight:"5vw"}}>
            <h2>Permissions</h2>
        <AddPermission render={render} setRender={setRender} />
        </div>
        <Table 
            columns={columns} 
            dataSource={permissionData} 
            scroll={{y : 350}} 
            style={{width: "98%"}} 
        />

    </div>
  )
};
export default Permissions;