import {Button, Input, Modal, Select, Space} from 'antd';
import {useState} from 'react';

const AddModule = () => {
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
        <>
            <Button onClick={() => setOpen(true)}>
                Add Module
            </Button>
            <Modal
                title="Add Module"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Input placeholder="Module Title"/>
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