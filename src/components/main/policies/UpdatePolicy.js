import {Modal} from 'antd';
import {useEffect, useState} from 'react';
import instance from '../../../utils/axios';
import {EditOutlined} from '@ant-design/icons';
import {Checkbox} from 'antd';
const UpdatePolicy = ({render, setRender, id, moduleTitle, record}) => {
    const [open, setOpen] = useState(false);
    let permissions=[];
    const [actionData, actionDataChange] = useState([]);
    
    useEffect(() => {
        instance.get(`/action/`)
            .then(resp => {
                actionDataChange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, [render]);

    const onChange = (checkedValues) => {
        if(checkedValues.target.checked){
            permissions.push(checkedValues.target.value)
        }else {
            permissions.pop(checkedValues.target.value)
        }
    };

    const UpdatePolicies = async () => {
        await instance.put(`/policy/${id}`, {actions:permissions, status: "published"})
            .then(resp => {
                setRender(!render)
            }).catch((err) => {
                console.log(err.message);
            });
        setOpen(false);
    };

    const ids = record.actions.map((m) => {
        permissions.push(m.id)
            return m.id
    });

    return (
        <>
            <EditOutlined onClick={() => {setOpen(true)}} />
            <Modal
                title="Update Policy"
                centered
                open={open}
                onOk={() => UpdatePolicies()}
                onCancel={() => setOpen(false)}
            >
                <div style={{display:"flex",flexDirection:"column"}}>
                    <span style={{fontSize: "20px"}}>Module Name: {moduleTitle}</span>
                    <div style={{marginTop:"5%"}}>
                        Select Actions :  {actionData.map((action)=>
                        <Checkbox onChange={onChange} defaultChecked={ids.includes(action.id)}  value={action.id}>{action.title}</Checkbox>
                    )}</div>
                </div>
            </Modal>
        </>
    );
};
export default UpdatePolicy;