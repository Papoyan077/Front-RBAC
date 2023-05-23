import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPolicyPermission, PostPermissions } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const AddPermission = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [policyData, setPolicyData] = useState(null);
  const [policies, setPolicies] = useState('');

  useEffect(() => {
    getPolicyPermission(setPolicyData)
  }, [render]);

  const handleChange = useCallback((value) => {
    setPolicies(value);
  }, []);

  const AddPermissions = async () => {
    PostPermissions(title, policies, render, setRender);
    setOpen(false);
  }
  const Cancel = () => {
    cancel();
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => { setOpen(true) }}>
        Add Permission
      </Button>
      <Modal
        title="Add Permission"
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
            AddPermissions();
            setPolicies(null);
            setTitle('');
          }}
        >
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

          <Form.Item
            label="Policy"
            initialValue={policies}
            rules={[{ required: true, message: 'Please select policy!' }]}
            hasFeedback
          >
            <Space
              direction="vertical"
              className="w-100"
            >
              <Select mode='multiple' className="w-100" onChange={handleChange} maxTagCount='responsive'>
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
            </Space>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <div className="modalButton">
              <Button onClick={Cancel} >
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddPermission;