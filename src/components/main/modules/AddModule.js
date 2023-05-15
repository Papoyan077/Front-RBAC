import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getActivity, getClients, getModules, PostModule } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const AddModule = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [moduleData, setModuleData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [client, setClient] = useState(null);
  const [parent, setParent] = useState(null);
  const [activitys, setActivitys] = useState(null);

  useEffect(() => {
    getModules(setModuleData);
  }, [render]);

  useEffect(() => {
    getClients(setClientData);
  }, [render]);

  useEffect(() => {
    getActivity(setActivityData);
  }, [render]);

  const ChangeParent = useCallback((value) => {
    setParent(value);
  }, []);

  const ChangeClient = useCallback((value) => {
    setClient(value);
  }, []);

  const ChangeActivity = useCallback((value) => {
    setActivitys(value);
  }, []);

  const AddModule = async () => {
    PostModule(title, render, setRender, client, parent, activitys);
    setOpen(false);
    setTitle('');
  }

  return (
    <>
      <Button onClick={() => { setOpen(true) }}>
        Add Module
      </Button>
      <Modal
        title="Add Module"
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        destroyOnClose
        width={500}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={() => {
            AddModule();
            setTitle('');
            setClient(null);
            setParent(null);
            setActivitys(null);
          }}
        >
          <Space direction="vertical" className="w-100">
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: 'Please write input title!' },
                { min: 3 }
              ]}
              hasFeedback
            >
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className='modal_input'
              />
            </Form.Item>

            <Form.Item label="Select Parent">
              <Select
                className="w-100"
                onChange={ChangeParent}
              >
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
            </Form.Item>

            <Form.Item
              label="Activities"
              name="activities"
              rules={[
                { required: true, message: 'Please Select Activities!' },
              ]}
              hasFeedback
            >
              <Select mode='multiple' className="w-100" onChange={ChangeActivity} maxTagCount='responsive'>
                {activityData ?
                  activityData.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.title}
                      </Option>
                    )
                  })
                  : null}
              </Select>
            </Form.Item>

            <Form.Item
              label="Client"
              name="client"
              rules={[
                { required: true, message: 'Please Select Client!' }
              ]}
              hasFeedback
            >
              <Select className="w-100" onChange={ChangeClient}>
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
            </Form.Item>
          </Space>
          <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: '15px' }}>
            <Button block type='primary' htmlType='submit'>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddModule;