import {Button, Input, Modal} from 'antd';
import { useState } from 'react';
import instance from '../../../utils/axios';



const UpdateAction = ({render, setRender , id}) => {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
console.log(id);
  const UpdateActions = async () => {
    await instance.put(`/action/${id}` , {title:title , status: "published"})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
          console.log(err.message);
    });
    setOpen(false);
    setTitle("")
  }
  return (
    <>
      <Button style={{width:"15%"}} className="btnStyle" type="text" onClick={() => {setOpen(true)}}>
        Update
      </Button>
      <Modal
        title="Update Action"
        centered
        open={open}
        onOk={() => UpdateActions()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title" />
      </Modal>
    </>
  );
};
export default UpdateAction;