import { Button, Input, Modal , Select, Space } from 'antd';
import { useState } from 'react';


const options = [];
for (let i = 10; i < 36; i++) {
  const value = i.toString(36) + i;
  options.push({
    label: `Long Label: ${value}`,
    value,
  });
}
const AddRole = () => {
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
    placeholder: 'Select Permissions',
    maxTagCount: 'responsive',
  };
  return (
    <>
      <div style={{width:"15%"}}>
      <Button className="btnStyle" type="text" onClick={() => setOpen(true)}>
        Add
      </Button></div>
      <Modal
        title="Add Role"
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
export default AddRole;