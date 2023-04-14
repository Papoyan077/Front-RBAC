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
    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
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
                        <span key={`action${updateIndex()}`}>{perm.title}</span>
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
          <div className='actionsIcons'>
            <UpdateRole titl={record.title} render={render} setRender={setRender} id={record.id}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record) }} className='deleteIcons'/>
          </div>
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
    <div className='main'>
        <div className="mainTitle">
            <span>Roles</span>
        <AddRole render={render} setRender={setRender} />
        </div>
        <Table 
            columns={columns} 
            dataSource={roleData} 
            scroll={{y : 350}} 
            style={{width: "98%"}}
            className='tableStyle'
            rowKey={updateIndex}
        />

    </div>
  )
};
export default Roles;