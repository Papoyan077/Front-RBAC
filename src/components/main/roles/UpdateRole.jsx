import { Input, Modal , Select, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { getPermissions , PutPermission, PutRoles } from '../../../utils/Route';
const { Option } = Select;




const UpdateRole = ({render, setRender , id , titl}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [permission , setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);

  useEffect(() => {
      getPermissions(permissionDataChange);
  }, [render]);

  const handleChange = (value) => {
    setPermission(value);
    console.log(value)
  };

  const UpdateRoles = async () => {
    PutPermission(id , title , render , setRender , permission);
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
        }}
        onCancel={() => {
          setOpen(false)}
        }
        width={1000}
      >
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title"
          // maxTagCount='responsive'
        />
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Select  mode='multiple' style={{width : "100%"}} placeholder="Select Permissions" onChange={handleChange}>
            { permissiondata ?
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