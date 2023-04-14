import {Table, Modal} from 'antd';
import {DeleteOutlined} from "@ant-design/icons";
import {useEffect, useState} from 'react';
import {ExclamationCircleFilled} from "@ant-design/icons";
import UpdateAction from './UpdateAction';
import AddAction from './AddAction';
import SearchFunc from '../../search';
import instance from '../../../utils/axios';
import {getActions} from '../../../utils/Route';

const {confirm} = Modal;

const Actions = () => {
    const [render, setRender] = useState(false);
    const [ActionsData, ActionsDataChange] = useState(null);

    useEffect(() => {
        getActions(ActionsDataChange)
    }, [render]);

    const [columns] = useState([
        {
            title: "Title",
            dataIndex: "title",
            ...SearchFunc('title'),
        },
        {
            title: "Actions",
            render: (record) => {
                return (
                    <div className='actionsIcons'>
                        <UpdateAction titl={record.title} render={render} setRender={setRender} id={record.id}/>
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
            title: 'Are you sure delete this action?',
            icon: <ExclamationCircleFilled/>,
            content: `Action name is (${record.title}):`,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                ActionsDataChange((action) => {
                    return action.filter((item) => item.id !== record.id);
                });
                instance.delete(`/action/${record.id}`)
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
        <div className='main'>
            <div className="mainTitle">
                <span>Actions</span>
                <AddAction render={render} setRender={setRender}/></div>
            <Table columns={columns} dataSource={ActionsData} scroll={{y: 350}} className='tableStyle'/>
        </div>
    )
};
export default Actions;