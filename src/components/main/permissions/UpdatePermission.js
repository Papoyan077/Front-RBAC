import { Form,Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, getPolicy, PutPermission } from '../../../utils/Route';
import { EditOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdatePermission = ({ render, setRender, id }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [Policydata, PolicyDataChange] = useState(null);
  const [policy, setPolicy] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

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
  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Permission"
        centered
        open={open}
        onOk={() => {
          UpdatePermissions()
          setPolicy(null)
          setRender(!render);
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={500}
      >
        <Form
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
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
        >
          <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='modal_input'
          /></Form.Item>
        <Form.Item
            label="Policy"
            name="policy"
            rules={[{ required: true, message: 'Please select policy!' }]}
        >
          <Space
              direction="vertical"
              className="w-100"
          >
            <Select mode='multiple' className="w-100" onChange={handleChange}>
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
          </Space></Form.Item></Form>
      </Modal>
    </>
  );
};
export default UpdatePermission;