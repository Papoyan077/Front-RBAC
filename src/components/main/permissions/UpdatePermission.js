import { Input, Modal , Select, Space } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import instance from '../../../utils/axios';
const { Option } = Select;




const UpdatePermission = ({render, setRender , id , titl}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titl);
  const [permission , setPermission] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);
  useEffect(() => {
      instance.get(`/permission/`)
          .then(resp => {
              permissionDataChange(resp.data);
          }).catch((err) => {
          console.log(err.message);
      })
  }, [render]);
  const handleChange = (value) => {
    setPermission(value);
  };

  const UpdateRoles = async () => {
    await instance.put(`/role/${id}` , {title:title , permissions: permission , status: "published"})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
    });
    setOpen(false);
  }
  return (
    <>
      <EditOutlined onClick={() => setOpen(true)} />
      <Modal
        title="Update Permission"
        centered
        open={open}
        onOk={() => UpdateRoles()}
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
          <Select defaultValue={permission} mode='multiple' style={{width : "100%"}} placeholder="Select Permissions" onChange={handleChange}>
            { permissiondata ?
              permissiondata.map(item => {
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
export default UpdatePermission;