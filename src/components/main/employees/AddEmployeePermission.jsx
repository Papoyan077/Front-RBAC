import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useCallback, useState } from 'react';
import { getPermissions, getRoles, PostEmployeePermission, PostRoles } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';

const AddEmployeePermission = ({ employeeData , render , setRender }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [permission, setPermission] = useState([]);
    const [permissionData, setPermissionData] = useState(null);

    console.log(title);
    const getPermissionData = useCallback(() => {
        return getPermissions(setPermissionData);
    }, []);

    const handleChange = useCallback((value) => {
        setPermission(value);
    }, []);

    const addEmployeePermission = async () => {
        PostEmployeePermission(employeeData.id , permission , render , setRender);
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
                getPermissionData();
                setTitle(employeeData.userName);
            }}>
                Add Permission
            </Button>
            <Modal
                title={`Add Permission for a: ${title} employee`}
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
                        addEmployeePermission();
                        setTitle('');
                    }}
                >
                    <Space
                        direction="vertical"
                        className="w-100"
                    >
                        <Form.Item
                            label="Permissions"
                            name="permissions"
                            rules={[{ required: true, message: 'Please select permissions!' }]}
                            hasFeedback
                        >
                            <Select
                                mode='multiple'
                                className="w-100"
                                onChange={handleChange}
                                maxTagCount="responsive"
                            >
                                {permissionData ?
                                    permissionData.map((item) => {
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
export default AddEmployeePermission;