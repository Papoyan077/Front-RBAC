import {Form, Input, Modal, Select, Space} from 'antd';
import {useCallback, useEffect, useState} from 'react';
import {getPermissions, getPolicy, PostPermissions} from '../../../utils/Route';
import {PlusCircleOutlined} from "@ant-design/icons";
import {cancel} from '../../../utils/Messages';

const {Option} = Select;

const AddPermission = ({render, setRender}) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [Policydata, PolicyDataChange] = useState(null);
    const [policies, setPolicies] = useState('');
    const [permissiondata, permissionDataChange] = useState(null);

    useEffect(() => {
        getPermissions(permissionDataChange);
    }, [render]);

    useEffect(() => {
        getPolicy(PolicyDataChange)
    }, [render]);

    const handleChange = useCallback((value) => {
        setPolicies(value);
    }, []);

    const AddPermissions = async () => {
        PostPermissions(title, policies, render, setRender);
        setOpen(false);
    }

    return (
        <>
           <div className="addButton" >
               <span>Add</span><PlusCircleOutlined onClick={() => {
                   setOpen(true)
               }}/>
           </div>
            <Modal
                title="Add Permission"
                centered
                open={open}
                onOk={() => {
                    AddPermissions();
                    setPolicies(null);
                    setTitle('');
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
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                        >
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className='modal_input'
                        /></Form.Item>
                    <Form.Item
                        label="Policy"
                        name="policy"
                        rules={[{ required: true, message: 'Please select policy!' }]}
                    >
                        <Space
                            direction="vertical"
                            className="w-100"
                        >
                            <Select mode='multiple' className="w-100" onChange={handleChange}>
                                {Policydata ?
                                    Policydata.map(item => {
                                        return (
                                            <Option key={item.id} value={item.id}>
                                                {item.title}
                                            </Option>
                                        )
                                    })
                                    : null}
                            </Select>
                        </Space></Form.Item></Form>
            </Modal>
        </>
    );
};
export default AddPermission;