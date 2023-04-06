import instance from "./axios";


////Actions
const getActions = async(ActionsDataChange) => {
  return (
    await instance.get('/action/').then(resp => {
      ActionsDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
};

const PostActions = async (title , render , setRender) => {
    await instance.post('/action/', {title: title})
        .then(resp => {
            setRender(!render)
            console.log(resp);
        }).catch((err) => {
            console.log(err.message);
        });
}

const PutActions = async (id , title , render , setRender) => {
  await instance.put(`/action/${id}` , {title:title , status: "published"})
  .then(resp => {
    setRender(!render)
    console.log(resp);
  }).catch((err) => {
        console.log(err.message);
  });
}

////Clinets

const getClients = async(clientDataChange) => {
  return (
    await instance.get('/client/').then(resp => {
      clientDataChange(resp.data);
        }).catch((err) => {
      console.log(err.message);
    })
  )
}

const PostClients = async (title , render , setRender) => {
  await instance.post('/client/', {title: title})
  .then(resp => {
      setRender(!render)
      console.log(resp);
  }).catch((err) => {
      console.log(err.message);
  });
}

const PutClients = async (id , title , render , setRender) => {
  await instance.put(`/client/${id}`, {title: title, status: "published"})
  .then(resp => {
    setRender(!render)
    console.log(resp);
  }).catch((err) => {
    console.log(err.message);
  });
}

////Employees

const getEmployees = async(employeesDataChange) => {
  return (
    await instance.get(`/employees/`)
    .then(resp => {
      employeesDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

const getEmployeesById = async(empDataChange , empId) => {
  return (
    await instance.get(`/employees/${empId.id}` , {params: {
      expandPermission : true,
      expandRole : true
    }})
    .then(resp => {
      empDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

////Permissions

const getPermissions = async(permissionDataChange) => {
  return (
    await instance.get(`/permission/`)
    .then(resp => {
      permissionDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

/////Roles

const getRoles = async(roleDataChange) => {
  return (
    await instance.get(`/role/`)
    .then(resp => {
      roleDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

const PostRoles = async (title , render , setRender , permission) => {
  await instance.post('/role/', {title: title , permission: permission})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
  });
}

const PutRoles = async ( id , title , render , setRender , permission ) => {
  await instance.put(`/role/${id}` , {title:title , permissions: permission , status: "published"})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
    });
}

//// Modules
const getModules = async (modulesDataChange) => {
  return (
    await instance.get(`/module/`)
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        console.log(err.message);
    })
  )
}

const getModulesTree = async (modulesDataChange) => {
  return (
    await instance.get(`/module/`, {params: {treeMode: true}})
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        console.log(err.message);
    })
  )
}

const PostModule = async (title , render , setRender , clientId , childId , parentId) => {
  await instance.post('/module/', {title: title , clientId:clientId , childId:childId , parentId:parentId})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
  });
}

////Policy

const getPolicy = async (policiesDataChange) => {
  return (
    await instance.get(`/policy/`)
      .then(resp => {
        policiesDataChange(resp.data);
      }).catch((err) => {
        console.log(err.message);
      })
  )
}

const PostPermissions = async (title , render , setRender , policies) => {
  await instance.post('/permission/', {title: title , policies: policies})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
  });
}

const PutPermission = async ( id , title , render , setRender , policies ) => {
  await instance.put(`/permission/${id}` , {title: title , policies: policies, status: "published"})
    .then(resp => {
      setRender(!render)
      console.log(resp);
    }).catch((err) => {
      console.log(err.message);
    });
}






  
export {getActions , PostActions , PutActions , getClients , PostClients , PutClients , getEmployees , getEmployeesById , getPermissions , PostPermissions , PutPermission , getRoles , PostRoles , PutRoles , getModules , getModulesTree , PostModule , getPolicy , };