import {Form, Input, Modal, Select, Space} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPermissions, PostRoles } from '../../../utils/Route';
import { PlusCircleOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

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

  return (
    <>
        <div className="addButton" >
            <span>Add</span><PlusCircleOutlined onClick={() => {
            setOpen(true)
        }}/>
        </div>
      <Modal
        title="Add Role"
        centered
        open={open}
        onOk={() => {
          AddRoles();
          setTitle('');
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
            rules={[{ required: true, message: 'Please input title!' }]}>
          <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className='modal_input'
              // maxTagCount='responsive'
          />
        </Form.Item>
        <Form.Item
            label="Permissions"
            name="permissions"
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
export default AddRole;