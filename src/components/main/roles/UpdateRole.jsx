import { Input, Modal, Select, Space } from 'antd';
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
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Space
          direction="vertical"
          className="w-100"
        >
          <Select mode='multiple' className="w-100" placeholder="Select Permissions" onChange={handleChange}>
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
      </Modal>
    </>
  );
};
export default UpdateRole;