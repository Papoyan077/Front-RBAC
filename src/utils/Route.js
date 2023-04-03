import instance from "./axios";


////Actions
const getActions = (ActionsDataChange) => {
  return (
    instance.get('/action/').then(resp => {
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

const getClients = (clientDataChange) => {
  return (
    instance.get('/client/').then(resp => {
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

const getEmployees = (employeesDataChange) => {
  return (
    instance.get(`/employees/`)
    .then(resp => {
      employeesDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

const getEmployeesById = (empdatachange , empid) => {
  return (
    instance.get(`/employees/${empid.id}` , {params: {
      expandPermission : true,
      expandRole : true
    }})
    .then(resp => {
      empdatachange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

////Permissions

const getPermissions = (permissionDataChange) => {
  return (
    instance.get(`/permission/`)
    .then(resp => {
      permissionDataChange(resp.data);
    }).catch((err) => {
      console.log(err.message);
    })
  )
}

/////Roles

const getRoles = (roleDataChange) => {
  return (
    instance.get(`/role/`)
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


  
export {getActions , PostActions , PutActions , getClients , PostClients , PutClients , getEmployees , getEmployeesById , getPermissions , getRoles , PostRoles , PutRoles};