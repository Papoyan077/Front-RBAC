import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { PutClients } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const UpdateClient = ({ render, setRender, id, titl }) => {
    const [title, setTitle] = useState(titl);
    const [open, setOpen] = useState(false);

    const UpdateClients = async () => {
        const result = await PutClients(id, title, render, setRender);
        setRender(result)
        setOpen(false);
    }
    return (
        <>
            <EditOutlined onClick={() => { setOpen(true) }} />
            <Modal
                title="Update Client"
                centered
                open={open}
                footer={null}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={500}
                destroyOnClose
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={() => {
                        UpdateClients();
                        setRender(!render);
                    }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        valuePropName={title}
                        rules={[
                            { required: true, message: 'Please input title!' },
                            { min: 3 }
                        ]}
                        hasFeedback
                    >
                        <Input value={title} onChange={e => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: '15px' }}>
                        <Button block type='primary' htmlType='submit'>
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default UpdateClient;