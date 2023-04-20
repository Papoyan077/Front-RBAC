import { Modal, Select} from 'antd';
import {useCallback, useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import {Checkbox} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";
import { PostPolicy, getActions, getModules } from '../../../utils/Route';
import { cancel } from '../../../utils/Messages';


const AddPolicy = () => {
    const [open, setOpen] = useState(false);
    const [actionData, actionDataChange] = useState([]);
    const [modulesData, modulesDataChange] = useState([]);
    const [moduleId , setModuleId] = useState('');
    const [actionId , setActionId] = useState('');
    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }
    const onChange = useCallback((checkedValues) => {
        setActionId(checkedValues);
    } , []);

    useEffect(() => {
        getModules(modulesDataChange);
    }, []);

    useEffect(() => {
        getActions(actionDataChange);
    }, []);

    const options = []
    modulesData.map((e)=>
        options.push({
            value: e.id,
            label: e.title,
    }));

    const AddPolicy = async () => {
        PostPolicy(actionId , moduleId);
        setOpen(false);
    }

    const handleChange = useCallback((value) => {
        setModuleId(value);
    } , []);

    return (
        <>
            <PlusCircleOutlined  style={{color:"grey",fontSize:"25px" , display:"flex",justifyContent:"center",alignItems:"center" }} onClick={() => { setOpen(true) }}/>
            <Modal
                title="Add Policy"
                centered
                open={open}
                onOk={() => AddPolicy()}
                onCancel={() => {
                    cancel();
                    setOpen(false)
                }}
                width={600}
            >
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Select Module"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={handleChange}
                    options={options}
                />
                <Checkbox.Group
                    style={{
                        width: '100%',

                    }}
                    onChange={onChange}
                >
                            <div style={{marginTop:"5%"}}>
                                Select Actions :  {actionData.map((e)=>
                                <Checkbox onChange={onChange} key={`action${updateIndex()}`}  value={e.id}>{e.title}</Checkbox>
                            )}</div>
                </Checkbox.Group>

            </Modal>
        </>
    );
};
export default AddPolicy;