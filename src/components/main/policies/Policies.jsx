import {Table, Modal, Checkbox} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {ExclamationCircleFilled} from "@ant-design/icons";
import UpdatePolicy from "./UpdatePolicy.js";
import instance from '../../../utils/axios';
import SearchFunc from '../../search';
import {getActions, getPolicy} from '../../../utils/Route';
import {cancel, error, succesDelete} from '../../../utils/Messages';
import PolicyActionsMore from "./PolicyActionsMore";

const {confirm} = Modal;

const Policies = () => {
        const [render, setRender] = useState(false);
        const [policiesData, policiesDataChange] = useState([]);
        const [actionData, actionDataChange] = useState([]);
        const [actions, setActions] = useState([]);

        const changeUpload = (state) => {
            setRender(state)
        };
        useEffect(() => {
            getActions(actionDataChange);
        }, [render]);
        useEffect(() => {
            async function fetchData() {
                await getPolicy(policiesDataChange);
            }

            fetchData()
        }, [render]);
        let lastIndex = 0;
        const string="barevvvv"
        const updateIndex = () => {
            lastIndex++
            return lastIndex
        };

        const [columns] = useState([
            {
                title: "Modules",
                dataIndex: "title",
                ...SearchFunc('title'),
            },

            {
                title: "Actions",
                render: (record) =>{
                    return (
                        <>
                            {record.actions?.slice(0, 1).map(action => {
                                return (
                                    <span key={`action${updateIndex()}`}>{action.title}</span>
                                )
                            })}
                            ({record.actions.length >= 0 ? record.actions.length : 0}) <PolicyActionsMore actions={record.actions} />
                        </>
                    )
                        ;
                },
            },

            {
                render:
                    (record) => {
                        return (
                            <div className='actionsIcons'>
                                <UpdatePolicy render={render} setRender={setRender} id={record.id} record={record}
                                              moduleTitle={record.title} changeUpload={changeUpload}/>
                                <DeleteOutlined onClick={() => {
                                    showDeleteConfirm(record)
                                }} className='deleteIcons'/>
                            </div>
                        );
                    },
            },
        ])


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
                        .then(() => {
                            succesDelete();
                        })
                        .catch(err => error(err.message))
                },
                onCancel() {
                    cancel();
                },
            });
        };

        return (
            <div className='main'>
                <div className="mainTitle">
                    <span>Policies</span>
                </div>
                <Table
                    columns={columns}
                    dataSource={policiesData}
                    scroll={{y: 445}}
                    className='tableStyle'
                    rowKey={updateIndex}
                />

            </div>
        )
    }
;
export default Policies;