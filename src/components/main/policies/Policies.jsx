import { Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import UpdatePolicy from "./UpdatePolicy.js";
import PolicyActionsMore from './PolicyActionsMore';
import SearchFunc from '../../search';
import { getPolicy } from '../../../utils/Route';
import { showDeleteConfirm } from '../../delete/index.js';

const Policies = () => {
    const [render, setRender] = useState(false);
    const [policiesData, policiesDataChange] = useState([]);

    const changeUpload = (state) => {
        setRender(state)
    };

    useEffect(() => {
        async function fetchData() {
            await getPolicy(policiesDataChange);
        }
        fetchData()
    }, [render]);

    let lastIndex = 0;

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
            render: (record) => {
                return (
                    <>
                        {record.actions?.slice(0, 1).map(action => {
                            return (
                                <span key={`action${updateIndex()}`}>{action.title}</span>
                            )
                        })}
                        ({record.actions.length >= 0 ? record.actions.length : 0}) <PolicyActionsMore actions={record.actions} />
                    </>
                );
            },
        },

        {
            render:
                (record) => {
                    return (
                        <div className='actionsIcons'>
                            <UpdatePolicy render={render} setRender={setRender} id={record.id} record={record}
                                moduleTitle={record.title} changeUpload={changeUpload} />
                            <DeleteOutlined onClick={() => { showDeleteConfirm(record, 'policy', 'policy', policiesDataChange) }} className='deleteIcons' />
                        </div>
                    );
                },
        },
    ])

    return (
        <div className='main'>
            <div className="mainTitle">
                <span>Policies</span>
            </div>
            <Table
                columns={columns}
                dataSource={policiesData}
                scroll={{ y: 445 }}
                className='tableStyle'
                rowKey={updateIndex}
            />

        </div>
    )
}
    ;
export default Policies;