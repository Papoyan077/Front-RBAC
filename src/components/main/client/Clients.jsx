import { Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { getClients } from '../../../utils/Route';
import AddClient from "./AddClient";
import UpdateClient from "./UpdateClient";
import SearchFunc from '../../search';
import { showDeleteConfirm } from '../../delete';

const Clients = () => {
  const [render, setRender] = useState(false);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getClients(setClientData)
    }
    fetchData()
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
      ...SearchFunc('title'),
    },
    {
      render: (record) => {
        return (
          <div className='icons'>
            <UpdateClient titl={record.title} render={render} setRender={setRender} id={record.id} />
            <DeleteOutlined onClick={() => { showDeleteConfirm(record, 'client', 'client', setClientData) }} className='deleteIcons' />
          </div>
        );
      },
    },
  ]);

  return (
    <div className='main'>
      <div className="mainTitle">
        <span>Clients</span>
        <AddClient render={render} setRender={setRender} />
      </div>
      <Table columns={columns} dataSource={clientData} rowKey={updateIndex} scroll={{ y: 445 }} className='tableStyle' />
    </div>
  )
};
export default Clients;