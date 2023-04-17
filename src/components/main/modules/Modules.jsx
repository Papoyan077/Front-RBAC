import {Table, Modal} from 'antd';
import {useEffect, useState} from 'react';
import AddModule from './AddModule';
import {getModulesTree} from '../../../utils/Route';
import SearchFunc from '../../search';
import {DeleteOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import instance from '../../../utils/axios';
import UpdateModule from './UpdateModule';

const {confirm} = Modal;

const Modules = () => {
    const [render, setRender] = useState(false);
    const [modulesData, modulesDataChange] = useState(null);

    useEffect(() => {
        getModulesTree(modulesDataChange);
    }, [render]);
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

    const [columns] = useState([
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...SearchFunc('title'),
        },
        {
            title: "Actions",
            render: (record) => {
                return (
                    <div className='actionsIcons'>
                        <UpdateModule titl={record.title} render={render} setRender={setRender} id={record.id}/>
                        <DeleteOutlined onClick={() => {
                            showDeleteConfirm(record)
                        }} className='deleteIcons'/>
                    </div>
                );
            },
        },
    ]);
    const showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure delete this Item?',
            icon: <ExclamationCircleFilled/>,
            content: `Item name is (${record.title}):`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                modulesDataChange((module) => {
                    return module.filter((item) => item.id !== record.id);
                });
                instance.delete(`/module/${record.id}`)
                    .then(res => {
                        setRender(!render)
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
        <div className='main'>
            <div className="mainTitle">
                <span>Modules</span>
                <AddModule render={render} setRender={setRender}/>
            </div>

            <Table
                columns={columns}
                dataSource={modulesData}
                scroll={{y: 350}}
                className='tableStyle'

            />
        </div>
    )
};
export default Modules;