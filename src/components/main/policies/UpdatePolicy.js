import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { cancel } from '../../../utils/Messages';
import { PutPolicy, getActions } from '../../../utils/Route';

const UpdatePolicy = ({ render, setRender, id, moduleTitle, record }) => {
    const [open, setOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionData, actionDataChange] = useState([]);

    let lastIndex = 0;
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    useEffect(() => {
        getActions(actionDataChange);
    }, [render]);

    const onChange = (checkedValues) => {
        if (checkedValues.target.checked && !actions.includes(checkedValues.target.value)) {
            actions.push(checkedValues.target.value);
        }
        else {
            actions.pop(checkedValues.target.value)
            console.log(actions)
        }
    }

    const UpdatePolicies = async () => {
        const result = await PutPolicy(id, actions, render, setRender);
        setRender(result)
        setOpen(false);
    }

    const ids = record.actions.map((m) => {
        actions.push(m.id)
        return m.id
    });

    return (
        <>
            <EditOutlined onClick={() => {
                setOpen(true)
                setActions([])
            }} />
            <Modal
                title="Update Policy"
                centered
                open={open}
                onOk={() => {
                    UpdatePolicies();
                    setRender(!render)
                    setActions([]);
                }}
                onCancel={() => {
                    cancel();
                    setActions([]);
                    setOpen(false)
                }
                }
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "20px" }}>Module Name: {moduleTitle}</span>
                    <div style={{ marginTop: "5%" }}>
                        Select Actions : {actionData.map((action) =>
                            <Checkbox onChange={onChange} defaultChecked={ids.includes(action.id)}
                                key={`action${updateIndex()}`} value={action.id}>{action.title}</Checkbox>
                        )}</div>
                </div>
            </Modal>
        </>
    );
};
export default UpdatePolicy;