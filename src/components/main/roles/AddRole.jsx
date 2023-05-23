import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useState } from 'react';
import { getPermissions, PostRoles } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddRole = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [permission, setPermission] = useState('');
  const [permissionData, setPermissionData] = useState(null);

  const getPermissionData = useCallback(() => {
    return getPermissions(setPermissionData);
  }, []);

  const handleChange = useCallback((value) => {
    setPermission(value);
  }, []);

  const AddRoles = async () => {
    PostRoles(title, render, setRender, permission);
    setOpen(false);
    setTitle('');
  }
  const Cancel = () => {
    cancel();
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => {
        setOpen(true);
        getPermissionData();
      }}>
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
          <Space
            direction="vertical"
            className="w-100"
          >
            <Form.Item
              label="Permissions"
              name="permissions"
              rules={[{ required: true, message: 'Please select permissions!' }]}
              hasFeedback
            >
              <Select
                mode='multiple'
                className="w-100"
                onChange={handleChange}
                maxTagCount="responsive"
              >
                {permissionData ?
                  permissionData.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.title}
                      </Select.Option>
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