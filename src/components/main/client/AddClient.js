import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import instance from '../../../utils/axios';



const AddClient = () => {
  const [title, settitle] = useState('');
  const [open, setOpen] = useState(false);

  const AddClients = async () => {
    await instance.post('/client/' , {title:title})
    .then(resp => {
      console.log(resp);
    }).catch((err) => {
          console.log(err.message);
    });
    setOpen(false);
  }
  return (
    <>
        <div style={{width:"15%"}}>
            <Button className="btnStyle" type="text" onClick={() => {setOpen(true)}}>
                Add
            </Button></div>
      <Modal
        title="Add Client"
        centered
        open={open}
        onOk={() => AddClients()}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input value={title} onChange={e => settitle(e.target.value)} placeholder="Client Title" />
      </Modal>
    </>
  );
};
export default AddClient;