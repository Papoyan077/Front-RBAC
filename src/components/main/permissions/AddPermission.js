import { Button, Input, Modal , Select, Space } from 'antd';
import { useState } from 'react';
import {PlusCircleOutlined} from "@ant-design/icons";
const options = [];
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}
const AddPermission = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(['a10', 'c12', 'h17', 'j19', 'k20']);
  const selectProps = {
    mode: 'multiple',
    style: {
      width: '100%',
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
    },
    placeholder: 'Select Policy',
    maxTagCount: 'responsive',
  };
  return (
    <>
      <Button style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px"}} type={"text"} onClick={() => { setOpen(true) }}>
        <PlusCircleOutlined  style={{color:"green",fontSize:"25px"}}/>
      </Button>
      <Modal
        title="Add Permission"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Input placeholder="Title" />
        <Space
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Select {...selectProps} />
        </Space>
      </Modal>
    </>
  );
};
export default AddPermission;