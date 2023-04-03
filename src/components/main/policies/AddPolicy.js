import {Button, Modal, Select} from 'antd';
import {useEffect, useState} from 'react';
import instance from "../../../utils/axios";
import {Checkbox} from 'antd';


const AddPolicy = () => {
    const [open, setOpen] = useState(false);
    const [actionData, actionDataChange] = useState([]);
    const [modulesData, modulesDataChange] = useState([]);
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    useEffect(() => {
        instance.get(`/module/`)
            .then(resp => {
                modulesDataChange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        instance.get(`/action/`)
            .then(resp => {
                actionDataChange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const options = []
    modulesData.map((e)=>
        options.push({
            value: e.id,
            label: e.title,
        }));
    const handleChange = () => {

    };
    return (
        <>
            <Button onClick={() => setOpen(true)}>
                AddPolicy
            </Button>
            <Modal
                title="Add Policy"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Search to Select"
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
                                <Checkbox onChange={onChange}  value={e.id}>{e.title}</Checkbox>
                            )}</div>
                </Checkbox.Group>

            </Modal>
        </>
    );
};
export default AddPolicy;