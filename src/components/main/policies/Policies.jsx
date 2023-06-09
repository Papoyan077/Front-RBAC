import { Table } from 'antd';
import { useEffect, useState } from 'react';
import SearchFunc from '../../search';
import { getPolicy } from '../../../utils/Route';

const Policies = () => {
    const [render, setRender] = useState(false);
    const [policiesData, setPoliciesData] = useState([]);

    // const changeUpload = (state) => {
    //     setRender(state)
    // };

    useEffect(() => {
        async function fetchData() {
            await getPolicy(setPoliciesData);
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
                    <div className='columnScroll'>
                        {record.activities?.map(activity => {
                            return (
                                <span key={`Activities${updateIndex()}`}>{activity.title},</span>
                            )
                        })}
                        {/* ({record.activities.length >= 0 ? record.activities.length : 0}) <PolicyActionsMore actions={record.activities} /> */}
                    </div>
                );
            },
        },

        // {
        //     render:
        //         (record) => {
        //             return (
        //                 <div className='actionsIcons'>
        //                     <UpdatePolicy render={render} setRender={setRender} id={record.id} record={record}
        //                         moduleTitle={record.title} changeUpload={changeUpload} />
        //                 </div>
        //             );
        //         },
        // },
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
                loading={policiesData ? false : true}
            />

        </div>
    )
}
    ;
export default Policies;