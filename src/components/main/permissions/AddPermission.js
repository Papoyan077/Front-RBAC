import { Input, Modal , Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getPermissions , getPolicy, PostPermissions } from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';
const { Option } = Select;

const AddPermission = ({render, setRender}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [Policydata, PolicyDataChange] = useState(null);
  const [policies , setPolicies] = useState('');
  const [permissiondata, permissionDataChange] = useState(null);
  
  useEffect(() => {
      getPermissions(permissionDataChange);
  }, [render]);

  useEffect(() => {
    getPolicy(PolicyDataChange)
  }, [render]);

  const handleChange = useCallback((value) => {
    setPolicies(value);
  } , []);

  const AddPermissions = async () => {
    PostPermissions(title , policies , render , setRender);
    setOpen(false);
  }
  console.log("title" , title);
  console.log("policy" , policies);
  return (
    <>
      <PlusCircleOutlined  style={{color:"grey",fontSize:"25px" , display:"flex",justifyContent:"center",alignItems:"center" }} onClick={() => { setOpen(true) }}/>
      <Modal
        title="Add Permission"
        centered
        open={open}
        onOk={() => {
          AddPermissions();
          setPolicies(null);
          setTitle('');
        }}
        onCancel={() => {
          cancel();
          setOpen(false)
        }}
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
          <Select mode='multiple' style={{width : "100%"}} placeholder="Select Policy" onChange={handleChange}>
            { Policydata ?
              Policydata.map(item => {
                console.log("policy daya " ,item);
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