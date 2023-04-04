import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import { PostClients } from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";

const AddClient = ({render, setRender}) => {
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const AddClients = async () => {
        PostClients(title , render , setRender);
        setOpen(false);
    }
    
    return (
        <>
            <Button style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"20px"}} type={"text"} onClick={() => { setOpen(true) }}>
                <PlusCircleOutlined  style={{color:"green",fontSize:"25px"}}/>
            </Button>
            <Modal
                title="Add Client"
                centered
                open={open}
                onOk={() => AddClients()}
                onCancel={() => {
                    setOpen(false)}
                  }
                width={1000}
            >
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Client Title"/>
            </Modal>
        </>
    );
};
export default AddClient;