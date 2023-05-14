import {Form, Input, Modal} from 'antd';
import { useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { PutActivity } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const UpdateActivity = ({ render, setRender, id, titl }) => {
  const [title, setTitle] = useState(titl);
  const [open, setOpen] = useState(false);

  const UpdateActivities = async () => {
    const result = await PutActivity(id, title, render);
    setRender(result);
    setOpen(false);
  }

  return (
    <>
      <EditOutlined onClick={() => { setOpen(true) }} />
      <Modal
        title="Update Activity"
        centered
        open={open}
        onOk={() => {
          UpdateActivities();
          setRender(!render);
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={500}
      ><Form
          labelCol={{
              span: 6,
          }}
          wrapperCol={{
              span: 12,
          }}
          layout="horizontal"
          style={{
              maxWidth: 800,
          }}>
          <Form.Item
              label="Title"
              name="Title"
              rules={[{ required: true, message: 'Please input title!' }]}
          >
              <Input value={title} onChange={e => setTitle(e.target.value)}/>
          </Form.Item></Form>
      </Modal>
    </>
  );
};
export default UpdateActivity;