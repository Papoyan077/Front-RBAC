import {Form, Input, Modal} from 'antd';
import { useState } from 'react';
import { PostActivity } from '../../../utils/Route';
import { PlusCircleOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';

const AddActivity = ({ render, setRender }) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddActivities = () => {
        PostActivity(title, render, setRender)
        setTitle('');
        setOpen(false);
    }

    return (
        <>
            <div className="addButton" >
                <span>Add</span><PlusCircleOutlined onClick={() => {
                setOpen(true)
            }}/>
            </div>
            <Modal
                title="Add Activity"
                centered
                open={open}
                onOk={() => {
                    AddActivities();
                    setTitle('');
                }}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={500}
            ><Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 12,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 800,
                }}>
                <Form.Item
                    label="Title"
                    name="Title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input value={title} onChange={e => setTitle(e.target.value)} />
                </Form.Item></Form>

            </Modal>
        </>
    );
};
export default AddActivity;