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
            title: "Activities",
            render: (record) => {
                return (
                    <>
                        {record.activity?.slice(0, 1).map(activity => {
                            return (
                                <span key={`Activities${updateIndex()}`}>{activity.title}</span>
                            )
                        })}
                        ({record.activity.length >= 0 ? record.activity.length : 0}) <PolicyActionsMore actions={record.activity} />
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