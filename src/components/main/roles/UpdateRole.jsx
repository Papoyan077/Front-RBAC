import {Form, Input, Modal, Select, Space} from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, PutRoles } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const UpdateRole = ({ render, setRender, id, titl }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [permission, setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

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

  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Role"
        centered
        open={open}
        onOk={() => {
          UpdateRoles();
          setPermission(null)
          setRender(!render);
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
        width={700}
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
            name="Title"
            rules={[{ required: true, message: 'Please input Title!' }]}
        >
          <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='modal_input'
              // maxTagCount='responsive'
          />
        </Form.Item>
        <Form.Item
            label="Permissions"
            name="Permissions"
            rules={[{ required: true, message: 'Please select permissions!' }]}
        >
          <Space
              direction="vertical"
              className="w-100"
          >
            <Select mode='multiple' className="w-100"  onChange={handleChange}>
              {permissiondata ?
                  permissiondata.map(item => {
                    //  console.log(item);
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
export default UpdateRole;