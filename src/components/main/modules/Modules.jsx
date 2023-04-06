import { Space, Switch, Table , Modal } from 'antd';
import { useEffect, useState } from 'react';
import AddModule from './AddModule';
import {getModulesTree} from '../../../utils/Route';
import SearchFunc from '../../search';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import instance from '../../../utils/axios';
import { Children } from 'react';
const { confirm } = Modal;

const Modules = () => {
  const [render, setRender] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [modulesData, modulesDataChange] = useState(null);
  const [Key , setKey] = useState('');
  
  useEffect( () => {
    getModulesTree(modulesDataChange);
  }, [render]);
  console.log(modulesData);
  modulesData &&
    modulesData.map((e)=>{
       e.key = e.id
        if (e.children){
            e.children.map((t)=>{
                t.key=t.id
                if (t.children){
                    t.children.map((r)=>{
                        r.key=r.id
                    })
                }
            })
        }
  })
  const [columns] = useState([
    {
      title : "Title" ,
      dataIndex : "title",
      key : "title",
      ...SearchFunc('title'),
    },
  ]);
  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure delete this Item?',
      icon: <ExclamationCircleFilled />,
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
  const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        console.log(columns, "---------")
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
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
            <h2>Modules</h2>
        <AddModule render={render} setRender={setRender} />
        </div>
        <Space
        align="center"
        style={{
          marginBottom: 16,
        }}
      >
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
        <Table 
          columns={columns}
          rowSelection={{
            ...rowSelection,
            checkStrictly,
          }}
          dataSource={modulesData} 
          scroll={{y : 350}} 
          style={{width: "98%"}} />
      </div>
  )
};
export default Modules;