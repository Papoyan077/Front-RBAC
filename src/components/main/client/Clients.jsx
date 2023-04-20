import { Table , Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect , useState } from 'react';
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getClients } from '../../../utils/Route';
import AddClient from "./AddClient";
import UpdateClient from "./UpdateClient";
import instance from '../../../utils/axios';
import SearchFunc from '../../search';
import { cancel, error, succesDelete } from '../../../utils/Messages';
const { confirm } = Modal;

const Clients = () => {
  const [render, setRender] = useState(false);
  const [clientData, clientDataChange] = useState(null);

  useEffect(() => {
      getClients(clientDataChange);
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
      ...SearchFunc('title'),
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <div className='actionsIcons'>
            <UpdateClient titl={record.title} render={render} setRender={setRender} id={record.id}/>
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
        clientDataChange((client) => {
          return client.filter((item) => item.id !== record.id);
        });
        instance.delete(`/client/${record.id}`)
        .then(res => {
            succesDelete();
        })
        .catch(err => error(err.message))
      },
      onCancel() {
          cancel();
      },
    });
  };

  return (
    <div className='main'>
        <div className="mainTitle">
            <span>Clients</span>
            <AddClient render={render} setRender={setRender} />
        </div>
        <Table columns={columns} dataSource={clientData} rowKey={updateIndex} scroll={{y : 350}} className='tableStyle'/>
    </div>
  )
};
export default Clients;