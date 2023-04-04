import {Input, Modal} from 'antd';
import {useState} from 'react';
import { EditOutlined } from "@ant-design/icons";
import { PutClients } from '../../../utils/Route';

const EmpPermissionEdit = ({render, setRender, id , titl}) => {
    const [title, setTitle] = useState(titl);
    const [open, setOpen] = useState(false);
    const UpdateClients = async () => {
        PutClients(id , title , render , setRender);
        setOpen(false);
    }
    return (
        <>
            <EditOutlined  style={{marginLeft:"5px"}} onClick={() => {setOpen(true)}} />
            <Modal
                title="Update Client"
                centered
                open={open}
                onOk={() => UpdateClients()}
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
export default EmpPermissionEdit;