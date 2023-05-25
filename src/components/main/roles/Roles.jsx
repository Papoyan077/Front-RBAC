import { Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import AddRole from "./AddRole"
import UpdateRole from "./UpdateRole"
import RolePermissionMore from "./RolePermissionMore";
import SearchFunc from '../../search';
import { getRoles } from '../../../utils/Route';
import { showDeleteConfirm } from '../../delete';

const Roles = () => {
  const [render, setRender] = useState(false);
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getRoles(setRoleData);
    }
    fetchData();
  }, [render]);

  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  const [columns] = useState([
    {
      title: "Title",
      dataIndex: "title",
      ...SearchFunc('title')
    },
    {
      title: "Permissions",
      render: (record) => {
        return (
          <>
            {record.permissions?.map(perm => {
              return (
                <span key={`action${updateIndex()}`}>{perm.title} ,</span>
              )
            })}
            {/* ({record.permissions.length > 0 ? record.permissions.length : null}) <RolePermissionMore permissions={record.permissions} /> */}
          </>
        )
      }
    },
    {
      render: (record) => {
        return (
          <div className='actionsIcons'>
            <UpdateRole titl={record.title} render={render} setRender={setRender} id={record.id} permissions={record.permissions}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record, 'role', 'role', setRoleData) }} className='deleteIcons' />
          </div>
        );
      },
    },
  ]);

  return (
    <div className='main'>
      <div className="mainTitle">
        <span>Roles</span>
        <AddRole render={render} setRender={setRender} />
      </div>
      <Table
        columns={columns}
        dataSource={roleData}
        scroll={{ y: 445 }}
        style={{ width: "98%" }}
        className='tableStyle'
        rowKey={updateIndex}
      />

    </div>
  )
};
export default Roles;