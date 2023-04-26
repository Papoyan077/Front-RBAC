import { Input, Modal } from 'antd';
import { useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { PutActions } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const UpdateAction = ({ render, setRender, id, titl }) => {
  const [title, setTitle] = useState(titl);
  const [open, setOpen] = useState(false);

  const UpdateActions = async () => {
    const result = await PutActions(id, title, render);
    setRender(result);
    setOpen(false);
  }

  return (
    <>
      <EditOutlined onClick={() => { setOpen(true) }} />
      <Modal
        title="Update Action"
        centered
        open={open}
        onOk={() => {
          UpdateActions();
          setRender(!render);
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={500}
      >
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title" />
      </Modal>
    </>
  );
};
export default UpdateAction;