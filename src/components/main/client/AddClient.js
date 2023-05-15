import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { PostClients } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddClient = ({ render, setRender }) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddClients = async () => {
        PostClients(title, render, setRender);
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => { setOpen(true) }}>
                Add Client
            </Button>
            <Modal
                title="Add Client"
                centered
                open={open}
                footer={null}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                destroyOnClose
                width={500}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={() => {
                        AddClients()
                        setTitle('')
                    }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
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
export default AddClient;