import { Button, Input, Modal , Select, Space } from 'antd';
// import { Option } from 'antd/es/mentions';
// import { Option } from 'antd/es/mentions';
// import axios from 'axios';
import { useState } from 'react';
// let JWTTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsImlhdCI6MTY3ODQ0NjU1Mn0.vsg37gZ-pPRq4qDKrTg9mswSuZ3Ij1RjRBiJ9mafig4' ;



const AddAction = () => {
  // const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  
  return (
    <><div style={{width:"15%"}}>
      <Button className="btnStyle" type="text" onClick={() => setOpen(true)}>
        Add
      </Button></div>
      <Modal
        title="Add Action"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input placeholder="Title" />
      </Modal>
    </>
  );
};
export default AddAction;