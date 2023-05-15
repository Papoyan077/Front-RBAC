import { Button, Form, Modal } from 'antd';
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

    const ids = record.activities.map((m) => {
        activity.push(m.id)
        return m.id
    });
    const Cancel = () => {
        cancel();
        setActivity([]);
        setOpen(false)
    }
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
                destroyOnClose
                footer={null}
                onCancel={() => {
                    cancel();
                    setActivity([]);
                    setOpen(false)
                }}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={() => {
                        UpdatePolicies();
                        setRender(!render)
                        setActivity([]);
                    }}
                >
                    <Form.Item
                        name='activities'
                    >
                        <div style={{ display: "flex", flexDirection: "column", width: "465px" }}>
                            <span style={{ fontSize: "20px" }}>Module Name: {moduleTitle}</span>
                            <div style={{ marginTop: "5%", display: "flex" }}>
                                Select Activities : {activityData.map((activity) =>
                                    <Checkbox onChange={onChange} defaultChecked={ids.includes(activity.id)}
                                        key={`activity${updateIndex()}`} value={activity.id}>{activity.title}</Checkbox>
                                )}</div>
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <div className="modalButton">
                            <Button onClick={Cancel} >
                                Cancel
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Update
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default UpdatePolicy;