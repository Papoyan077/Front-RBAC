import { Input, Modal, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { PutModule } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const UpdateModule = ({ render, setRender, id, titl }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);

  const UpdateModule = async () => {
    const result = await PutModule(id, title, render);
    setRender(result);
    setOpen(false);
    setTitle(titl);
  }

  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Module"
        centered
        open={open}
        onOk={() => {
          UpdateModule();
          setRender(!render);
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
        </Space>
      </Modal>
    </>
  );
};
export default UpdateModule;