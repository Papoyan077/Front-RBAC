import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from 'react';
import { PutModule, getActivity } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdateModule = ({ render, setRender, id, titl, activities }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [activity, activityDataChange] = useState(null);
  const [activitys, setActivitys] = useState(null);

  const getSelected = () => {
    let selected = [];
    activities.map((item) => {
      return selected.push(item.id)
    })
    return selected
  }

  useEffect(() => {
    getActivity(activityDataChange);
  }, [render]);

  const UpdateModule = async () => {
    const result = await PutModule(id, title, render, activitys);
    setRender(result);
    setOpen(false);
    setTitle(titl);
  }

  const ChangeActivity = useCallback((value) => {
    setActivitys(value);
  }, []);

  const Cancel=()=>{
    setOpen(false)
  }
  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Module"
        centered
        footer={null}
        open={open}
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
            UpdateModule();
            setRender(!render);
          }}
        >
          <Space
            direction="vertical"
            className="w-100"
          >
            <Form.Item
              label="Title"
              name="title"
              valuePropName={title}
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

            <Form.Item
              label="Activities"
              name="activities"
              rules={[{ required: true, message: 'Please select activities!' }]}
              hasFeedback
            >
              <Select defaultValue={getSelected()} mode='multiple' className="w-100" onChange={ChangeActivity} maxTagCount='responsive'>
                {activity ?
                  activity.map(item => {
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
export default UpdateModule;