import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import { PostActions } from '../../../utils/Route';

const AddAction = ({render, setRender}) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddActions = () => {
        PostActions(title , render , setRender)
        setTitle('');    
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => {setOpen(true) }}>
                Add Action
            </Button>
            <Modal
                title="Add Action"
                centered
                open={open}
                onOk={() => AddActions()}
                onCancel={() => { setOpen(false) }}
                width={1000}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title"/>
            </Modal>
        </>
    );
};
export default AddAction;