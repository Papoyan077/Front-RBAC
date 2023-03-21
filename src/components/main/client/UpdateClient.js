import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import instance from '../../../utils/axios';

const UpdateClient = ({render, setRender, id}) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const UpdateClients = async () => {
        await instance.put(`/client/${id}`, {title: title, status: "published"})
            .then(resp => {
                setRender(!render)
                console.log(resp);
            }).catch((err) => {
                console.log(err.message);
            });
        setOpen(false);
    }
    return (
        <>

                <Button className="btnStyle" type="text" onClick={() => {
                    setOpen(true)
                }}>
                    Update
                </Button>
            <Modal
                title="Update Client"
                centered
                open={open}
                onOk={() => UpdateClients()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Client Title"/>
            </Modal>
        </>
    );
};
export default UpdateClient;