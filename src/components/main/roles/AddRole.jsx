import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, PostRoles } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddRole = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [permission, setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

  useEffect(() => {
    getPermissions(permissionDataChange);
  }, [render]);

  const handleChange = useCallback((value) => {
    setPermission(value);
  }, []);

  const AddRoles = async () => {
    PostRoles(title, render, setRender, permission);
    setOpen(false);
    setTitle('');
  }
    const Cancel=()=>{
        setOpen(false)
    }

  return (
    <>
      <Button onClick={() => { setOpen(true) }}>
        Add Role
      </Button>
      <Modal
        title="Add Role"
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        destroyOnClose
        width={700}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={() => {
            AddRoles();
            setTitle('');
          }}
        >
          <Form.Item
            label="Title"
            name="Title"
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
            label="Permissions"
            name="permissions"
            rules={[{ required: true, message: 'Please select permissions!' }]}
            hasFeedback
          >
            <Space
              direction="vertical"
              className="w-100"
            >
              <Select
                mode='multiple'
                className="w-100"
                onChange={handleChange}
                maxTagCount="responsive"
              >
                {permissiondata ?
                  permissiondata.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
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
                      Add
                  </Button>
              </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddRole;