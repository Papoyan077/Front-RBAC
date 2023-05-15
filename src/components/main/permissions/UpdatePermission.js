import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, getPolicy, PutPermission } from '../../../utils/Route';
import { EditOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdatePermission = ({ titl, render, setRender, id , policies }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [Policydata, PolicyDataChange] = useState(null);
  const [policy, setPolicy] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

  const getSelected = () => {
    let selected = [];
    policies.map((item) => {
      return selected.push(item.id)
    })
    return selected
  }

  useEffect(() => {
    getPermissions(permissionDataChange);
  }, [render]);

  useEffect(() => {
    getPolicy(PolicyDataChange)
  }, [render]);

  const handleChange = useCallback((value) => {
    console.log(value);
    setPolicy(value);
  }, []);

  const UpdatePermissions = async () => {
    const result = await PutPermission(id, title, render, policy);
    setRender(result);
    setOpen(false);
    setTitle('');
  }
  const Cancel=()=>{
    setOpen(false)
  }
  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Permission"
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
            UpdatePermissions()
            setPolicy(null)
            setRender(!render);
          }}
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
            label="Policy"
            name="policy"
            rules={[{ required: true, message: 'Please select policy!' }]}
            hasFeedback
          >
            <Space
              direction="vertical"
              className="w-100"
            >
              <Select defaultValue={getSelected()} mode='multiple' className="w-100" onChange={handleChange} maxTagCount='responsive'>
                {Policydata ?
                  Policydata.map(item => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.title}
                      </Option>
                    )
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