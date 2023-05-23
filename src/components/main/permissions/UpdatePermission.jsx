import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useState } from 'react';
import { PutPermission, getPolicyPermission } from '../../../utils/Route';
import { EditOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdatePermission = ({ titl, render, setRender, id, policies }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [policy, setPolicy] = useState([]);
  const [policyData, setPolicyData] = useState(null);

  const getPolicyData = useCallback(() => {
    return getPolicyPermission(setPolicyData);
  }, []);

  const getSelected = () => {
    let selected = [];
    policies.map((item) => {
      return selected.push(item.id);
    })
    return selected;
  };

  const handleChange = useCallback((value) => {
    setPolicy(value);
  }, []);

  const UpdatePermissions = async () => {
    const result = await PutPermission(id, title, render, policy);
    setRender(result);
    setOpen(false);
    setTitle('');
  }

  const Cancel = () => {
    cancel();
    setOpen(false);
  }

  return (
    <>
      <EditOutlined onClick={() => {
        setOpen(true);
        getPolicyData();
      }} />
      <Modal
        title="Update Permission"
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel();
          setOpen(false);
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
            UpdatePermissions();
            setPolicy(null);
            setRender(!render);
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            initialValue={title}
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
          <Space
            direction="vertical"
            className="w-100"
          >
            <Form.Item
              label="Policy"
              name='policy'
              rules={[{ required: true, message: 'Please select policy!' }]}
              hasFeedback
            >

              <Select defaultValue={getSelected()} mode='multiple' className="w-100" onChange={handleChange} maxTagCount='responsive'>
                {policyData ?
                  policyData.map(item => {
                   return item.policies.map(policy => {
                      return (
                        <Option key={policy.id} value={policy.id}>
                              {item.title}                          
                        </Option>
                      )
                    })
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
export default UpdatePermission;