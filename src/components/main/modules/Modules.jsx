import { Table } from 'antd';
import { useEffect, useState } from 'react';
import AddModule from './AddModule';
import { getModulesTree } from '../../../utils/Route';
import SearchFunc from '../../search';
import { DeleteOutlined } from '@ant-design/icons';
import UpdateModule from './UpdateModule';
import { showDeleteConfirm } from '../../delete';

const Modules = () => {
    const [render, setRender] = useState(false);
    const [modulesData, setModulesData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await getModulesTree(setModulesData);
        }
        fetchData()
    }, [render]);
    console.log(modulesData)

    let lastIndex = 0
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    modulesData &&
        modulesData.map((first) => {
            first.key = `modules${updateIndex()}`
            if (first.children != null) {
                first.children.map((second) => {
                    second.key = `child${updateIndex()}`
                    if (second.children != null) {
                        second.children.map((third) => {
                            third.key = `child${updateIndex()}`
                            if (third.children != null) {
                                third.children.map((fourth) => {
                                    fourth.key = `child${updateIndex()}`
                                })
                            }
                        })
                    }
                })
            }
        });

    const getModulesId=(record)=> {
        let arr1 = [];
        const children = record.children;
        if (children && children.length > 0) {
            for (const id in children) {
                arr1 = getModulesId(children[id]);
            }
        }

        console.log("aaaaaaaaaaaa", record.id);
        return [...arr1, record.id];
    }

    const [columns] = useState([
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...SearchFunc('title'),
        },
        {
            title: "Client",
            render: (record) => {
                return (
                    <>
                        {record.client ?
                            <span key={`client${updateIndex()}`}>{record.client.title}</span>
                            : null}
                    </>
                )
            }
        },
        {
            title: "Activities",
            render: (record) => {
                return (
                    <>
                        {record.activities?.map(item => {
                            return (
                                <span key={`activity${updateIndex()}`}>{item.title},</span>
                            )
                        })}
                    </>
                )
            }
        },
        {
            render: (record) => {
                return (
                    <div className='icons'>
                        <UpdateModule titl={record.title} render={render} setRender={setRender} id={record.id} activities={record.activities} />
                        <DeleteOutlined onClick={() => {
                            const x  = getModulesId(record);
                            console.log("XXXXXXXXXXXXXXXXXXXXXX", x);
                        }} className='deleteIcons' />
                        {/*() => { showDeleteConfirm(record, 'module', 'module', setModulesData) }*/}
                    </div>
                );
            },
        },
    ]);

    return (
        <div className='main'>
            <div className="mainTitle">
                <span>Modules</span>
                <AddModule render={render} setRender={setRender} />
            </div>
            <Table
                columns={columns}
                dataSource={modulesData}
                scroll={{ y: 445 }}
                className='tableStyle'
            />
        </div>
    )
};
export default Modules;