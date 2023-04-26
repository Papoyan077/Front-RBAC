import { Input, Modal } from 'antd';
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
                onOk={() => {
                    UpdateClients();
                    setRender(!render);
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
export default UpdateClient;