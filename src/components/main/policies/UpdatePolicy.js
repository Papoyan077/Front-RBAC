import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { cancel } from '../../../utils/Messages';
import { PutPolicy, getActivity } from '../../../utils/Route';

const UpdatePolicy = ({ render, setRender, id, moduleTitle, record }) => {
    const [open, setOpen] = useState(false);
    const [activity, setActivity] = useState([]);
    const [activityData, activityDataChange] = useState([]);

    let lastIndex = 0;
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    useEffect(() => {
        getActivity(activityDataChange);
    }, [render]);

    const onChange = (checkedValues) => {
        if (checkedValues.target.checked && !activity.includes(checkedValues.target.value)) {
            activity.push(checkedValues.target.value);
        }
        else {
            activity.pop(checkedValues.target.value)
        }
    }

    const UpdatePolicies = async () => {
        const result = await PutPolicy(id, activity, render, setRender);
        setRender(result)
        setOpen(false);
    }

    const ids = record.activity.map((m) => {
        activity.push(m.id)
        return m.id
    });

    return (
        <>
            <EditOutlined onClick={() => {
                setOpen(true)
                setActivity([])
            }} />
            <Modal
                title="Update Policy"
                centered
                open={open}
                onOk={() => {
                    UpdatePolicies();
                    setRender(!render)
                    setActivity([]);
                }}
                onCancel={() => {
                    cancel();
                    setActivity([]);
                    setOpen(false)
                }
                }
            >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "20px" }}>Module Name: {moduleTitle}</span>
                    <div style={{ marginTop: "5%" }}>
                        Select Activities : {activityData.map((activity) =>
                            <Checkbox onChange={onChange} defaultChecked={ids.includes(activity.id)}
                                key={`activity${updateIndex()}`} value={activity.id}>{activity.title}</Checkbox>
                        )}</div>
                </div>
            </Modal>
        </>
    );
};
export default UpdatePolicy;