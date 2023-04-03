import { Button, Input, Modal , Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getPermissions , PostRoles } from '../../../utils/Route';
const { Option } = Select;

const AddRole = ({render, setRender}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [permission , setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);
  
  useEffect(() => {
      getPermissions(permissionDataChange);
  }, [render]);

  const handleChange = (value) => {
    setPermission(value);
  };

  const AddRoles = async () => {
    PostRoles(title , render , setRender , permission);
    setOpen(false);
    setTitle('');
  }
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Add Role
      </Button>
      <Modal
        title="Add Role"
        centered
        open={open}
        onOk={() => AddRoles()}
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
          <Select mode='multiple' style={{width : "100%"}} placeholder="Select Permissions" onChange={handleChange}>
            { permissiondata ?
              permissiondata.map(item => {
                //  console.log(item);
                return(
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
export default AddRole;