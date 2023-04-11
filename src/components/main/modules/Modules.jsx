import { Table , Modal } from 'antd';
import { useEffect, useState } from 'react';
import AddModule from './AddModule';
import {getModulesTree} from '../../../utils/Route';
import SearchFunc from '../../search';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import instance from '../../../utils/axios';
import UpdateModule from './UpdateModule';
const { confirm } = Modal;

const Modules = () => {
  const [render, setRender] = useState(false);
  const [modulesData, modulesDataChange] = useState(null);
  
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
  });

  const [columns] = useState([
    {
      title : "Title" ,
      dataIndex : "title",
      key : "title",
      ...SearchFunc('title'),
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <UpdateModule titl={record.title} render={render} setRender={setRender} id={record.id}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record) }} style={{ color: "red", marginLeft: 12 }}/>
          </>
        );
      },
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

        <Table 
          columns={columns}
          dataSource={modulesData} 
          scroll={{y : 350}} 
          style={{width: "98%"}} />
      </div>
  )
};
export default Modules;