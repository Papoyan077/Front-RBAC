import { Input, Modal , Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { PutModule } from '../../../utils/Route';

const UpdateModule = ({render, setRender , id , titl}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);

  const UpdateModule = async () => {
    PutModule(id , title , render , setRender );
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
        onOk={() => UpdateModule()}
        onCancel={() => {
          setOpen(false)}
        }
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