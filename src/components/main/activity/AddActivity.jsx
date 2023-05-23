import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { PostActivity } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddActivity = ({ render, setRender }) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddActivities = () => {
        PostActivity(title, render, setRender)
        setTitle('');
        setOpen(false);
    }
    const Cancel=()=>{
        cancel();
        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => { setOpen(true) }}>
                Add Activity
            </Button>
            <Modal
                title="Add Activity"
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
                        AddActivities();
                        setTitle('');
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
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <div className="modalButton">
                            <Button onClick={Cancel} >
                                Cancel
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Add
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default AddActivity;