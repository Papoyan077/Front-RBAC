import { Table , Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from "@ant-design/icons";
import AddRole from "./AddRole"
import UpdateRole from "./UpdateRole"
import instance from '../../../utils/axios';
import RolePermissionMore from "./RolePermissionMore";
import SearchFunc from '../../search';
import { getRoles } from '../../../utils/Route';

const { confirm } = Modal;

const Roles = () => {
    const [render, setRender] = useState(false);
    const [roleData, roleDataChange] = useState(null);
    useEffect(() => {
        getRoles(roleDataChange)
    }, [render]);

  const [columns] = useState([
    {
      title : "Title" ,
      dataIndex : "title",
      ...SearchFunc('title')
    },
    {
        title : "Permissions",
        render: (record) => {
            return (
            <>
                {record.permissions?.slice(0 , 1).map(perm => {
                    return (
                        <span >{perm.title}</span>
                    )
                })}
                ({record.permissions.length > 0 ? record.permissions.length : null}) <RolePermissionMore permissions={record.permissions} />
            </>
            )
        }
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <UpdateRole titl={record.title} render={render} setRender={setRender} id={record.id}/>
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
        roleDataChange((role) => {
          return role.filter((item) => item.id !== record.id);
        });
        instance.delete(`/role/${record.id}`)
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
            <h2>Roles</h2>
        <AddRole render={render} setRender={setRender} />
        </div>
        <Table 
            columns={columns} 
            dataSource={roleData} 
            scroll={{y : 350}} 
            style={{width: "98%"}} 
            // expandable={{
            //     expandedRowRender: (record) => (
            //         <>
            //             {record.permissions?.slice(0 , 1).map(perm => {
            //                 // {console.log(perm);}
            //                     return (
            //                         <h2 key={perm.id}>{perm.title}</h2>
            //                     )
            //                 })}
            //                 {/* {record.permissions.length-1 > 0 ? record.permissions.length-1 : null} <RolePermissionMore permissions={record.permissions} /> */}
            //             </>
            //     ),
            //     rowExpandable: (record) => record.name !== 'Not Expandable',
            //   }} 
        />

    </div>
  )
};
export default Roles;