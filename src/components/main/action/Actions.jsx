import { Table , Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { ExclamationCircleFilled } from "@ant-design/icons";
import UpdateAction from './UpdateAction';
import AddAction from './AddAction';
import SearchFunc from '../../search';
import instance from '../../../utils/axios';
import {getActions} from '../../../utils/Route';
const { confirm } = Modal;

const Actions = () => {
  const [render, setRender] = useState(false);
  const [ActionsData, ActionsDataChange] = useState(null);

  useEffect(() => {
    getActions(ActionsDataChange)
  }, [render]);

  const [columns] = useState([
    {
      title : "Title" ,
      dataIndex : "title",
      ...SearchFunc('title'),
      // ...getColumnSearchProps('title'),
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <UpdateAction titl={record.title} render={render} setRender={setRender} id={record.id}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record) }} style={{ color: "red", marginLeft: 12 }}/>
          </>
        );
      },
    },
  ]);

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure delete this Item?',
      icon: <ExclamationCircleFilled />,
      content: `Item name is (${record.title}):`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        ActionsDataChange((action) => {
          return action.filter((item) => item.id !== record.id);
        });
        instance.delete(`/action/${record.id}`)
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
        <div className="card-title">
            <h2>Actions</h2>
        </div>
        <AddAction render={render} setRender={setRender} />
        <Table columns={columns} dataSource={ActionsData} scroll={{y : 350}} style={{width: "98%"}} />
    </div>
  )
};
export default Actions;