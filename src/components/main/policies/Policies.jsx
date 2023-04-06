import {Table, Modal} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {ExclamationCircleFilled} from "@ant-design/icons";
import AddPolicy from "./AddPolicy";
import UpdatePolicy from "./UpdatePolicy.js";
import instance from '../../../utils/axios';
import PolicyActionsMore from './PolicyActionsMore';
import SearchFunc from '../../search';
import { getPolicy } from '../../../utils/Route';

const {confirm} = Modal;

const Policies = () => {
        const [render, setRender] = useState(false);
        const [policiesData, policiesDataChange] = useState([]);
        useEffect(() => {
            getPolicy(policiesDataChange);
        }, [render]);

        const [columns] = useState([
            {
                title: "Modules",
                dataIndex: "title",
                ...SearchFunc('title'),
            },

    {
        title: "Actions",
        render: (record) => {
            return (
              <>
                {record.actions?.slice(0 , 1).map(action => {
                    return (
                        <span>{action.title}</span>
                    )
                })}
                ({record.actions.length > 0 ? record.actions.length : 0}) <PolicyActionsMore actions={record.actions} />
              </>
            );
        },
    },

    {
        title: "Params",
        render:
(record) => {
    return (
        <>
            <UpdatePolicy render={render} setRender={setRender} id={record.id} record={record}
                          moduleTitle={record.title}/>
            <DeleteOutlined onClick={() => {
                showDeleteConfirm(record)
            }} style={{color: "red", marginLeft: 12}}/>
        </>
    );
},
},
])
;

const showDeleteConfirm = (record) => {
    confirm({
        title: 'Are you sure delete this action?',
        icon: <ExclamationCircleFilled/>,
        content: `Action name is (${record.title}):`,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            policiesDataChange((policy) => {
                return policy.filter((item) => item.id !== record.id);
            });
            instance.delete(`/policy/${record.id}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err))
        },
        onCancel() {
            console.log("Deletion pcrocess is canceled");
        },
    });
};

return (
    <div style={{
        paddingLeft: "10px",
        marginRight: "10px",
        marginTop: "10px",
        width: "100%",
        height: "85vh",
    }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"25px",marginRight:"5vw"}}>
            <h2>Policies</h2>
        <AddPolicy render={render} setRender={setRender}/>
        </div>
        <Table
            columns={columns}
            dataSource={policiesData}
            scroll={{y: 350}}
            style={{width: "98%"}}
        />

    </div>
)
}
;
export default Policies;