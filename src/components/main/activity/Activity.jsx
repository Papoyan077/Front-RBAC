import { Table } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import UpdateActivity from './UpdateActivity';
import AddActivity from './AddActivity';
import SearchFunc from '../../search';
import { getActivity } from '../../../utils/Route';
import { showDeleteConfirm } from '../../delete';

const Activity = () => {
    const [render, setRender] = useState(false);
    const [ActivityData, ActivityDataChange] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await getActivity(ActivityDataChange);
        }
        fetchData();
    }, [render]);

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex;
    }

    const [columns] = useState([
        {
            title: "Title",
            dataIndex: "title",
            ...SearchFunc('title'),
        },
        {
            render: (record) => {
                return (
                    <div className='actionsIcons'>
                        <UpdateActivity titl={record.title} render={render} setRender={setRender} id={record.id} />
                        <DeleteOutlined onClick={() => {
                            showDeleteConfirm(record, 'activity', 'activity', ActivityDataChange);
                        }} className='deleteIcons' />
                    </div>
                );
            },
        },
    ]);

    return (
        <div className='main'>
            <div className="mainTitle">
                <span>Activities</span>
                <AddActivity render={render} setRender={setRender} /></div>
            <Table columns={columns} dataSource={ActivityData} scroll={{ y: 445 }} rowKey={updateIndex} className='tableStyle' />
        </div>
    )
};
export default Activity;