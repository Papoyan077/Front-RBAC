import "./modules.css"
import AddModule from "./AddModule"
import {PlusOutlined} from '@ant-design/icons';
import {Collapse} from 'antd';
import {TreeSelect} from 'antd';
import {useState} from "react";
import {Box} from "@mui/material";

const {SHOW_PARENT} = TreeSelect;
const {Panel} = Collapse;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];
const Modules = () => {
    // const [clientdata, clientdatachange] = useState(null);
    // useEffect(() => {
    //     const instance = axios.create({
    //         baseURL: 'http://localhost:8080/',
    //         timeout: 1000,
    //         headers: {'Authorization': 'Bearer '+ JWTTOKEN}
    //       });
    //       instance.get(`/client/`)
    //       .then(resp => {
    //           clientdatachange(resp.data);
    //       }).catch((err) => {
    //             console.log(err.message);
    //         })
    // }, []);

    const [value, setValue] = useState(['0-0-0']);

    const onChange = (key) => {
        console.log(key);
    };
    const genExtra = () => (
        <PlusOutlined
            onClick={(event) => {
                <AddModule/>
                event.stopPropagation();
            }}
        />
    );

    const onChanged = (newValue) => {
        console.log('onChange ', value);
        setValue(newValue);
    };
    const tProps = {
        treeData,
        value,
        onChanged,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
            width: '100%',
        },
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "10px",
            marginTop: "10px",
            width: "100vw",
            height: "85vh",
        }}>
            <div className="card-title">
                <h2>Modules</h2>
            </div>
            <Box className="border-blue" sx={{width: "100%", height: "100%", overflow: "scroll"}}>
                <Box sx={{margin: "10px"}}>
                    <div className="card-body">
                        {/* {clientdata &&
                                clientdata.map(item => ( */}
                        <Collapse
                            defaultActiveKey={['1']}
                            onChange={onChange}
                        >
                            <Panel header="Client1" key="1" extra={genExtra()}>
                                <TreeSelect {...tProps} />
                            </Panel>
                        </Collapse>
                    </div>
                </Box>
            </Box>
        </div>
    );
}

export default Modules;