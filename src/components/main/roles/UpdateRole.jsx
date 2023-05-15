import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, PutRoles } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdateRole = ({ render, setRender, id, titl, permissions }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [permission, setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

  const getSelected = () => {
    let selected = [];
    permissions.map((item) => {
      return selected.push(item.id)
    })
    return selected
  }

  useEffect(() => {
    getPermissions(permissionDataChange);
  }, [render]);

  const handleChange = useCallback((value) => {
    setPermission(value);
  }, []);

  const UpdateRoles = async () => {
    const result = await PutRoles(id, title, render, permission);
    setRender(result);
    setOpen(false);
  }
  const Cancel=()=>{
    setOpen(false)
  }

  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Role"
        centered
        open={open}
        footer={null}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={700}
        destroyOnClose
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          style={{ maxWidth: 800 }}
          onFinish={() => {
            UpdateRoles();
            setPermission(null)
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
                defaultValue={getSelected()}
                mode='multiple'
                className="w-100"
                onChange={handleChange}
                maxTagCount='responsive'
              >
                {permissiondata ?
                  permissiondata.map(item => {
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
export default UpdateRole;