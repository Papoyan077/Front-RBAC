import { Table , Modal } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect , useState } from 'react';
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getClients } from '../../../utils/Route';
import AddClient from "./AddClient";
import UpdateClient from "./UpdateClient";
import instance from '../../../utils/axios';
import SearchFunc from '../../search';
const { confirm } = Modal;

const Clients = () => {
  const [render, setRender] = useState(false);
  const [clientData, clientDataChange] = useState(null);

  useEffect(() => {
      getClients(clientDataChange);
  }, [render]);

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
          <>
            <UpdateClient titl={record.title} render={render} setRender={setRender} id={record.id}/>
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
        clientDataChange((client) => {
          return client.filter((item) => item.id !== record.id);
        });
        instance.delete(`/client/${record.id}`)
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
            <h2>Clients</h2>
        </div>
        <AddClient render={render} setRender={setRender} />
        <Table columns={columns} dataSource={clientData} scroll={{y : 350}} style={{width: "98%"}} />
    </div>
  )
};
export default Clients;