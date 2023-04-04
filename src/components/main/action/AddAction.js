import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import { PostActions } from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";

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
            <Button style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px"}} type={"text"} onClick={() => { setOpen(true) }}>
                <PlusCircleOutlined  style={{color:"green",fontSize:"25px"}}/>
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