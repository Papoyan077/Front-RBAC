import { Input, Modal} from 'antd';
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
            <PlusCircleOutlined  style={{color:"grey",fontSize:"25px" , display:"flex",justifyContent:"center",alignItems:"center" }} onClick={() => { setOpen(true) }}/>
            <Modal
                title="Add Action"
                centered
                open={open}
                onOk={() => {
                    AddActions();
                    setTitle('');
                }}
                onCancel={() => { setOpen(false) }}
                width={500}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Action Title"/>
            </Modal>
        </>
    );
};
export default AddAction;