import { Button, Input, Modal , Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getPermissions , getPolicy, PostPermissions, PostRoles } from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";
const { Option } = Select;

const AddPermission = ({render, setRender}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [Policydata, PolicyDataChange] = useState(null);
  const [policy , setPolicy] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);
  
  useEffect(() => {
      getPermissions(permissionDataChange);
  }, [render]);

  useEffect(() => {
    getPolicy(PolicyDataChange)
  }, [render]);

  // console.log(permissiondata);

  const handleChange = (value) => {
    setPolicy(value);
  };

  const AddPermissions = async () => {
    PostPermissions(title , render , setRender , policy);
    setOpen(false);
    setTitle('');
  }
  return (
    <>
        <Button style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px"}} type={"text"} onClick={() => { setOpen(true) }}>
            <PlusCircleOutlined  style={{color:"green",fontSize:"25px"}}/>
        </Button>
      <Modal
        title="Add Permission"
        centered
        open={open}
        onOk={() => AddPermissions()}
        onCancel={() => {
          setOpen(false)}
        }
        width={500}
      >
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)} 
          placeholder="Title"
        />
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Select mode='multiple' style={{width : "100%"}} placeholder="Select Modules" onChange={handleChange}>
            { Policydata ?
              Policydata.map(item => {
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
export default AddPermission;