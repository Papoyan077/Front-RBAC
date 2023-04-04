// import {Space, Table} from 'antd';
// import {useState, useEffect} from 'react';
// import instance from "../../../utils/axios";

// const columns = [
//     {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//     },
//     {
//         title: 'Title',
//         dataIndex: 'title',
//         key: 'title',

//     },

// ];
// let data =[];

// const Modules = () => {
//     const [render, setRender] = useState(false);
//     const [modulesData, modulesDataChange] = useState([]);
//     useEffect(() => {
//         instance.get(`/module/`, {params: {treeMode: true}})
//             .then(resp => {
//                 modulesDataChange(resp.data);
//             }).catch((err) => {
//             console.log(err.message);
//         })
//     }, [render]);

//     // data=modulesData
//     modulesData.forEach(e=>{
//         e.key=e.id
//     })
//     return (
//         <>
//             <div>
//                 <h2>Modules</h2>
//             </div>
//             <div className="bodyInner" style={{width: "100%", height: "100%", overflow: "scroll"}}>
//                 <div className={"tableBody"}>
//                     <Space
//                         align="center"
//                         style={{
//                             marginBottom: 16,
//                         }}
//                     >
//                     </Space>
//                     <Table
//                         columns={columns}
//                         dataSource={modulesData}
//                     />
//                     <div/>
//                 </div>
//             </div>
//             </>
//     );
// };
// export default Modules;


import { Checkbox, Table } from 'antd';
// import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
// import { ExclamationCircleFilled } from "@ant-design/icons";
import AddModule from "./AddModule"
import instance from '../../../utils/axios';
// const { confirm } = Modal;

const Roles = () => {
    const [render, setRender] = useState(false);
    const [modulesData, modulesDataChange] = useState([]);
    useEffect(() => {
        instance.get(`/module/`, {params: {treeMode: true}})
            .then(resp => {
                modulesDataChange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, [render]);
    console.log(modulesData);

    modulesData.forEach(e=>{
        e.key=e.id
    })
  const [columns] = useState([
    {
        render: (record) => {
            return (
              <>
                <Checkbox />
              </>
            );
        },
    },
    {
      title : "Title" ,
      dataIndex : "title",
      key : "title"
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            {/* <UpdateRole titl={record.title} render={render} setRender={setRender} id={record.id}/>
            <DeleteOutlined onClick={() => { showDeleteConfirm(record) }} style={{ color: "red", marginLeft: 12 }}/> */}
          </>
        );
      },
    },
  ]);

//   const showDeleteConfirm = (record) => {
//     confirm({
//       title: 'Are you sure delete this action?',
//       icon: <ExclamationCircleFilled />,
//       content: `Action name is (${record.title}):`,
//       okText: 'Yes',
//       okType: 'danger',
//       cancelText: 'No',
//       onOk() {
//         roleDataChange((role) => {
//           return role.filter((item) => item.id !== record.id);
//         });
//         instance.delete(`/role/${record.id}`)
//         .then(res => {
//             console.log(res);
//         })
//         .catch(err => console.log(err))
//       },
//       onCancel() {
//             console.log("Deletion pcrocess is canceled");
//       },
//     });
//   };

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
            style={{width: "98%"}} 
        />

    </div>
  )
};
export default Roles;


