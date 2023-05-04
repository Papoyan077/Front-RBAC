import { Input, Modal } from 'antd';
import { useState } from 'react';
import { PostClients } from '../../../utils/Route';
import { PlusCircleOutlined } from "@ant-design/icons";
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
            <PlusCircleOutlined className="addButton" onClick={() => { setOpen(true) }} />
            <Modal
                title="Add Client"
                centered
                open={open}
                onOk={() => {
                    AddClients()
                    setTitle('')
                }}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={500}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Client Title" />
            </Modal>
        </>
    );
};
export default AddClient;