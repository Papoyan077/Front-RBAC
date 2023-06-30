import { Button, Form, InputNumber, Modal, Select, Space } from 'antd';
import { useCallback, useState } from 'react';
import { getEmployees, sendUserPermissions } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';
import { SendOutlined } from '@ant-design/icons';

const SendUserPermissions = ({ sender, senderId, render, setRender }) => {
    const [open, setOpen] = useState(false);
    const [time, setTime] = useState(1);
    const [EmployeesData, setEmployeesData] = useState(null);
    const [receiver, setReceiver] = useState('');
    let result;

    const getEmployeesData = useCallback(async () => {
        return await getEmployees(setEmployeesData);
    }, []);


    EmployeesData ?
        result = EmployeesData.filter((item) => item.id !== senderId)
        : console.log("Chkaaaaaa");


    const handleChange = useCallback((value) => {
        setReceiver(value);
    }, []);
    // console.log(receiver);

    const sendPermissions = async () => {
        sendUserPermissions(sender, receiver, time, render, setRender);
        setOpen(false);
        setTime('');
    }
    const Cancel = () => {
        cancel();
        setOpen(false)
    }

    return (
        <>
            <SendOutlined onClick={() => {
                setOpen(true);
                getEmployeesData();
            }} />
            <Modal
                title="Send Permissions"
                centered
                open={open}
                footer={null}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                destroyOnClose
                width={600}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={() => {
                        sendPermissions();
                        setRender(!render)
                        setTime('');
                    }}
                >
                    <Form.Item
                        label="Time"
                        name="Time"
                        initialValue={time}
                        rules={[
                            { required: true, message: 'Please write input time!' },
                        ]}
                        hasFeedback
                    >
                        <InputNumber
                            value={time}
                            onChange={e => setTime(e)}
                            min="1"
                            className='modal_input'
                        />
                    </Form.Item>
                    <Space
                        direction="vertical"
                        className="w-100"
                    >
                        <Form.Item
                            label="Receiver"
                            name="Receiver"
                            rules={[{ required: true, message: 'Please select permissions!' }]}
                            hasFeedback
                        >
                            <Select
                                className="w-100"
                                onChange={handleChange}
                            >
                                {result ?
                                    result.map((item) => {
                                        return (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.userName}
                                            </Select.Option>
                                        )
                                    })
                                    : null}
                            </Select>
                        </Form.Item>
                    </Space>
                    <Form.Item wrapperCol={{ span: 24 }}>
                        <div className="modalButton">
                            <Button onClick={Cancel} >
                                Cancel
                            </Button>
                            <Button type='primary' htmlType='submit'>
                                Add
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default SendUserPermissions;