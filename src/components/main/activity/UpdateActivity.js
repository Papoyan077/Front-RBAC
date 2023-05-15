import { Button, Form, Input, Modal } from 'antd';
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
    const Cancel=()=>{
        setOpen(false)
    }
  return (
    <>
      <EditOutlined onClick={() => { setOpen(true) }} />
      <Modal
        title="Update Activity"
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={500}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={() => {
            UpdateActivities();
            setRender(!render);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            valuePropName={title}
            rules={[
              { required: true, message: 'Please input title!' },
              { min: 3 }
            ]}
            hasFeedback
          >
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
              <div className="modalButton">
                  <Button onClick={Cancel} >
                      Cancel
                  </Button>
                  <Button type='primary' htmlType='submit'>
                      Update
                  </Button>
              </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateActivity;