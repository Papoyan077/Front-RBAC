import {Form, Input, Modal, Select, Space} from 'antd';
import {useCallback, useEffect, useState} from 'react';
import {getClients, getModules, PostModule} from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";
import {cancel} from '../../../utils/Messages';

const {Option} = Select;

const AddModule = ({render, setRender, activity}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [moduleData, setModuleData] = useState(null);
    const [clientData, setClientData] = useState(null);
    const [client, setClient] = useState(null);
    const [parent, setParent] = useState(null);
    const [activitys, setActivitys] = useState(null);


    useEffect(() => {
        getModules(setModuleData);
    }, [render]);

    useEffect(() => {
        getClients(setClientData);
    }, [render]);

    const ChangeParent = useCallback((value) => {
        setParent(value);
    }, []);

    const ChangeClient = useCallback((value) => {
        setClient(value);
    }, []);

    const ChangeActivity = useCallback((value) => {
        setActivitys(value);
    }, []);


    const AddModule = async () => {
        PostModule(title, render, setRender, client, parent, activitys);
        setOpen(false);
        setTitle('');
    }

    return (
        <>
            <div className="addButton" >
                <span>Add</span><PlusCircleOutlined onClick={() => {
                setOpen(true)
            }}/>
            </div>
            <Modal
                title="Add Module"
                centered
                open={open}
                onOk={() => {
                    AddModule();
                    setTitle('');
                    setClient(null);
                    setParent(null);
                    activity(null);
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
                            label="Parent">
                            <Select className="w-100" onChange={ChangeParent}>
                                {moduleData ?
                                    moduleData.map(item => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.title}
                                            </Option>
                                        )
                                    })
                                    : null}
                            </Select></Form.Item>
                        <Form.Item
                            label="Activities"
                            name="Activities"
                            rules={[{ required: true, message: 'Please Select Activities!' }]}
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
                        <Form.Item
                            label="Client"
                            name="Select Client"
                            rules={[{ required: true, message: 'Please Select Client!' }]}
                        >

                            <Select className="w-100" onChange={ChangeClient}>
                                {clientData ?
                                    clientData.map(item => {
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
export default AddModule;