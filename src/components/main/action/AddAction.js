import { Input, Modal } from 'antd';
import { useState } from 'react';
import { PostActions } from '../../../utils/Route';
import { PlusCircleOutlined } from "@ant-design/icons";
import { cancel } from '../../../utils/Messages';

const AddAction = ({ render, setRender }) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddActions = () => {
        PostActions(title, render, setRender)
        setTitle('');
        setOpen(false);
    }

    return (
        <>
            <PlusCircleOutlined className="addButton" onClick={() => { setOpen(true) }} />
            <Modal
                title="Add Action"
                centered
                open={open}
                onOk={() => {
                    AddActions();
                    setTitle('');
                }}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={500}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title" />
            </Modal>
        </>
    );
};
export default AddAction;