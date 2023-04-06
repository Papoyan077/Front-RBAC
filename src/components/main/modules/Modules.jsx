// import { Space, Switch, Table } from 'antd';
// import { useState } from 'react';
// const columns = [
//   {
//     title: 'Title',
//     dataIndex: 'title',
//     key: 'title',
//   },
//   {
//     title: 'Clients',
//     dataIndex: 'client',
//     width: '30%',
//     key: 'client',
//   },
// ];

  ////const [key , setKey] = useState('1');
  ///string + number = string;


// const data = [
//   {
//     key: 1,
//     title: 'home',
//     client : "Poject Matrix",
//     children: [
//       {
//         key: 11,
//         title: 'home/home',
//         client: 'Projecttt',
//       },
//       {
//         key: 12,
//         title: 'home/home/home',
//         client: 'Projecttt',
//         children: [
//           {
//             key: 121,
//             title: 'home/home/home/home',
//             client: 'Projecttt',
//           },
//         ],
//       },
//       {
//         key: 13,
//         title: 'Dashboard',
//         client: 'Projecttt',
//         children: [
//           {
//             key: 131,
//             title: 'Dashboard/Dashboard',
//             client: 'Projecttt',
//             children: [
//               {
//                 key: 1311,
//                 title: 'Dashboard/Dashboard/Dashboard',
//                 client: 'Projecttt',
//               },
//               {
//                 key: 1312,
//                 title: 'Dashboard/Dashboard/Dashboard/Dashboard',
//                 client: 'Projecttt',
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: 2,
//     title: 'Admin',
//     client: 'Projecttt',
//   },
// ];

// // rowSelection objects indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys, selectedRows) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   onSelect: (record, selected, selectedRows) => {
//     console.log(record, selected, selectedRows);
//   },
//   onSelectAll: (selected, selectedRows, changeRows) => {
//     console.log(selected, selectedRows, changeRows);
//   },
// };
// const App = () => {
//   const [checkStrictly, setCheckStrictly] = useState(false);
//   return (
//     <div style={{
//               paddingLeft: "10px",
//               marginRight: "10px",
//               marginTop: "10px",
//               width: "100%",
//               height: "85vh",
//           }}>
//       <Space
//         align="center"
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
//       </Space>
//       <Table
//         columns={columns}
//         rowSelection={{
//           ...rowSelection,
//           checkStrictly,
//         }}
//         dataSource={data}
//       />
//     </div>
//   );
// };
// export default App;

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
    modulesData.map((e , i)=>{
      return e.key = i
  })

  const [columns] = useState([
    {
      title : "Key" ,
      dataIndex : "id",
      key : "id",
      // ...SearchFunc('title'),
    },
    {
      title : "Title" ,
      dataIndex : "title",
      key : "title",
      ...SearchFunc('title'),
    },
    // {
    //   title : "Client" ,
    //   dataIndex : "client",
    //   key : "client",
    // },
    // {
    //   title: "Actions",
    //   render: (record) => {
    //     return (
    //       <>
    //         {/* <UpdateAction titl={record.title} render={render} setRender={setRender} id={record.id}/> */}
    //         <DeleteOutlined key={record.id} onClick={() => { showDeleteConfirm(record) }} style={{ color: "red", marginLeft: 12 }}/>
    //       </>
    //     );
    //   },
    // },
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

  // const expandItem = (treeView, key) => {  
  //   function findNode(nodes, key) {  
  //       var i, result = null;  
  //       for(i = 0; i < nodes.length; i++) {  
  //           if(nodes[i].key == key) {  
  //               result = nodes[i];  
  //               break;  
  //           }  
  //           if(nodes[i].children) {  
  //               result = findNode(nodes[i].children, key);  
  //               if(result) {  
  //                   break;  
  //               }  
  //           }  
  //       }  
  //       return result;  
  //   }  
  //   var node = findNode(treeView.getNodes(), key);  
  //   while(node) {  
  //       treeView.expandItem(node.key);  
  //       node = node.parent;  
  //   }  
  // }

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


    // const createNewKey = (data) => {
    //    modulesDataChange(data);
    //   return data.forEach((item, index) => {
    //       item.key = index;
    //       // console.log(item, "new item")
    //           if(typeof item.children === "object"){
    //             return createNewKey(item.children)
    //           }
    //   })
    // }





    //   const getData = async () => {
    //     const data = await getModules()
    //     return data;    
    //   }
    //   getData()
    //   .then((res) => {
    //    let x = createNewKey(res);
    //    console.log(x)
    //   } )
    //   .catch((err) => {
    //     console.log(err.message);
    // })
      // console.log("------------modules", modulesData );
      // createNewKey(modulesData)