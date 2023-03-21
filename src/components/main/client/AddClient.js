import { Button, Input, Modal , Select, Space } from 'antd';
import { useState } from 'react';
import instance from '../../../utils/axios';

const AddClient = () => {
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  const AddClient = async () => {
    await instance.post('/client/' , {title:title})
    .then(resp => {
      console.log(resp);
    }).catch((err) => {
          console.log(err.message);
    });
    setOpen(false);
    setTitle("")
  }
  return (
    <><div style={{width:"15%"}}>
      <Button className="btnStyle" type="text" onClick={() => {setOpen(true)}}>
        Add
      </Button></div>
      <Modal
        title="Add Client"
        centered
        open={open}
        onOk={() => AddClient()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Client Title" />
      </Modal>
    </>
  );
};
export default AddClient;