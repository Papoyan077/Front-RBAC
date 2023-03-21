import { Button, Input, Modal , Select, Space } from 'antd';
// import { Option } from 'antd/es/mentions';
// import { Option } from 'antd/es/mentions';
// import axios from 'axios';
import { useState } from 'react';
// let JWTTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsImlhdCI6MTY3ODQ0NjU1Mn0.vsg37gZ-pPRq4qDKrTg9mswSuZ3Ij1RjRBiJ9mafig4' ;



const AddModule = () => {
  // const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  const options = [];
for (let i = 0; i < 10; i++) {
  options.push({
    value: "sdfsdf",
    label: "sdfsf",
  });
}
  return (
    <><div style={{width:"15%"}}>
      <Button className="btnStyle" type="text" onClick={() => setOpen(true)}>
        Add
      </Button></div>
      <Modal
        title="Add Module"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input placeholder="Module Title" />
        <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Select
          defaultValue="Parent Module"
          onChange={handleChange}
          style={{
            width: 200,
          }}
          options={options}
        />

        <Select
          defaultValue="Client"
          onChange={handleChange}
          style={{
            width: 200,
          }}
          options={options}
        />
      </Space>
      </Modal>
    </>
  );
};
export default AddModule;