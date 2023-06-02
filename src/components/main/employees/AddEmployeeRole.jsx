import { Button, Form, Modal, Select, Space } from 'antd';
import { useCallback, useState } from 'react';
import { getRoles, PostEmployeeRole } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddEmployeeRole = ({ employeeData, render, setRender }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [role, setRole] = useState([]);
    const [roleData, setRoleData] = useState(null);

    const getRoleData = useCallback(() => {
        return getRoles(setRoleData);
    }, []);

    const handleChange = useCallback((value) => {
        setRole(value);
    }, []);

    const addEmployeeRole = async () => {
        PostEmployeeRole(employeeData.id, role, render, setRender);
        setOpen(false);
        setTitle('');
    }
    const Cancel = () => {
        cancel();
        setOpen(false)
    }

    return (
        <>
            <Button onClick={() => {
                setOpen(true);
                getRoleData();
                setTitle(employeeData.title);
            }}>
                Add Role
            </Button>
            <Modal
                title="Add Employee Role"
                centered
                open={open}
                footer={null}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                destroyOnClose
                width={700}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    layout="horizontal"
                    style={{ maxWidth: 800 }}
                    onFinish={() => {
                        addEmployeeRole();
                        setTitle('');
                    }}
                >
                    <Space
                        direction="vertical"
                        className="w-100"
                    >
                        <Form.Item
                            label="Roles"
                            name="role"
                            rules={[{ required: true, message: 'Please select Roles!' }]}
                            hasFeedback
                        >
                            <Select
                                mode='multiple'
                                className="w-100"
                                onChange={handleChange}
                                maxTagCount="responsive"
                            >
                                {roleData ?
                                    roleData.map((item) => {
                                        return (
                                            <Select.Option key={item.id} value={item.id}>
                                                {item.title}
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
export default AddEmployeeRole;