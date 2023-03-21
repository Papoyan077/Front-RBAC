import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import instance from '../../../utils/axios';


const AddAction = ({render, setRender}) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddActions = async () => {
        await instance.post('/action/', {title: title})
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
            <div style={{width: "15%"}}>
                <Button className="btnStyle" type="text" onClick={() => {
                    setOpen(true)
                }}>
                    Add Action
                </Button></div>
            <Modal
                title="Add Action"
                centered
                open={open}
                onOk={() => AddActions()}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title"/>
            </Modal>
        </>
    );
};
export default AddAction;