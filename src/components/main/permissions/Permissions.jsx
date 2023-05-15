import { Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import AddPermission from "./AddPermission"
import UpdatePermission from './UpdatePermission';
import SearchFunc from '../../search';
import { getPermissions } from '../../../utils/Route';
import { showDeleteConfirm } from '../../delete';

const Permissions = () => {
  const [render, setRender] = useState(false);
  const [permissionData, permissionDataChange] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getPermissions(permissionDataChange);
    }
    fetchData();
  }, [render]);
  console.log(permissionData);

  let lastIndex = 0
  const updateIndex = () => {
    lastIndex++
    return lastIndex
  }

  const [columns] = useState([
    {
      title: "Title",
      dataIndex: "title",
      ...SearchFunc('title'),
    },
    {
      title: "Policies",
      render: (record) => {
        return (
          <div>
            {record.policies?.map(policy => {
              // console.log(policy);
              return (
                <span key={`policy${updateIndex()}`}>{policy.policyModule.title} </span>

              )
            })}
          </div>
        )
      }
    },
    {
      render: (record) => {
        console.log(record);
        return (
          <div className='actionsIcons'>
            <UpdatePermission titl={record.title} render={render} setRender={setRender} id={record.id} policies={record.policies}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record, 'permission', 'permission', permissionDataChange) }} className='deleteIcons' />
          </div>
        );
      },
    },
  ]);

  return (
    <div className='main'>
      <div className="mainTitle">
        <span>Permissions</span>
        <AddPermission render={render} setRender={setRender} />
      </div>
      <Table
        columns={columns}
        dataSource={permissionData}
        scroll={{ y: 445 }}
        className='tableStyle'
        rowKey={updateIndex}
      />

    </div>
  )
};
export default Permissions;