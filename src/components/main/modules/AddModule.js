import { Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getClients, getModules, PostModule } from '../../../utils/Route';
import { PlusCircleOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';

const { Option } = Select;

const AddModule = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [moduleData, setModuleData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [client, setClient] = useState(null);
  const [parent, setParent] = useState(null);

  useEffect(() => {
    getModules(setModuleData);
  }, [render]);

  useEffect(() => {
    getClients(setClientData);
  }, [render]);

  const ChangeParent = useCallback((value) => {
    setParent(value);
  }, []);
  const ChangeClient = useCallback((value) => {
    setClient(value);
  }, []);

  const AddModule = async () => {
    PostModule(title, render, setRender, client, parent);
    setOpen(false);
    setTitle('');
  }

  return (
    <>
      <PlusCircleOutlined style={{ color: "grey", fontSize: "25px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => { setOpen(true) }} />
      <Modal
        title="Add Module"
        centered
        open={open}
        onOk={() => {
          AddModule();
          setTitle('');
          setClient(null);
          setParent(null);
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={500}
      >
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Select style={{ width: "100%" }} placeholder="Select Parent" onChange={ChangeParent}>
            {moduleData ?
              moduleData.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                )
              })
              : null}
          </Select>

          <Select style={{ width: "100%" }} placeholder="Select Client" onChange={ChangeClient}>
            {clientData ?
              clientData.map(item => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.title}
                  </Option>
                )
              })
              : null}
          </Select>
        </Space>
      </Modal>
    </>
  );
};
export default AddModule;