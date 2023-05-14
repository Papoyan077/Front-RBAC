import {Form, Input, Modal, Select, Space} from 'antd';
import {EditOutlined} from "@ant-design/icons";
import {useCallback, useEffect, useState} from 'react';
import {PutModule, getActivity} from '../../../utils/Route';
import {cancel} from '../../../utils/Messages';

const {Option} = Select;

const UpdateModule = ({render, setRender, id, titl}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(titl);
    const [activity, activityDataChange] = useState(null);
    const [activitys, setActivitys] = useState(null);

    useEffect(() => {
        getActivity(activityDataChange);
    }, [render]);

    const UpdateModule = async () => {
        const result = await PutModule(id, title, render, activitys);
        setRender(result);
        setOpen(false);
        setTitle(titl);
    }

    const ChangeActivity = useCallback((value) => {
        setActivitys(value);
    }, []);

    return (
        <>
            <EditOutlined onClick={() => setOpen(true)}/>
            <Modal
                title="Update Module"
                centered
                open={open}
                onOk={() => {
                    UpdateModule();
                    setRender(!render);
                }}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={500}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 800,
                    }}>
                    <Space
                        direction="vertical"
                        className="w-100"
                    >
                        <Form.Item
                            label="Title"
                            name="Title"
                            rules={[{ required: true, message: 'Please input title!' }]}

                        >
                            <Input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className='modal_input'
                            /></Form.Item>
                        <Form.Item
                            label="Activities"
                            name="activities"
                            rules={[{ required: true, message: 'Please select activities!' }]}
                        >
                            <Select mode='multiple' className="w-100" onChange={ChangeActivity}>
                                {activity ?
                                    activity.map(item => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.title}
                                            </Option>
                                        )
                                    })
                                    : null}
                            </Select></Form.Item>

                    </Space></Form>
            </Modal>
        </>
    );
};
export default UpdateModule;