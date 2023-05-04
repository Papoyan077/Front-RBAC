import { error, loginError, succesLogin, succesPost, succesPut } from "./Messages";
import instance from "./axios";



const login = async (username, password, navigate) => {
  instance.post(`/login/`, { "login": username, "password": password })
    .then(resp => {
      if (resp.status === 200) {
        succesLogin(username)
        navigate("/layout/")
      }
    }).catch(() => {
      loginError()
    })
}
////Actions
const getActions = async (ActionsDataChange) => {
  return (
    await instance.get('/action/').then(resp => {
      return ActionsDataChange(resp.data);
    }).catch((err) => {
      error(err.message)
    })
  )
};

const PostActions = async (title, render, setRender) => {
  await instance.post('/action/', { title: title })
    .then(resp => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message)
    });
}

const PutActions = async (id, title, render) => {
  await instance.put(`/action/${id}`, { title: title, status: "published" })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message)
      return false
    });
}

////Clinets

const getClients = async (clientDataChange) => {
  return (
    await instance.get('/client/').then(resp => {
      clientDataChange(resp.data);
      return true
    }).catch((err) => {
      error(err.message)
      return false
    })
  )
}

const PostClients = async (title, render, setRender) => {
  await instance.post('/client/', { title: title })
    .then(resp => {
      setRender(!render)
      succesPost()
    }).catch((err) => {
      error(err.message)
    });
}

const PutClients = async (id, title, render) => {
  await instance.put(`/client/${id}`, { title: title, status: "published" })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message)
      return false
    });
}

////Employees

const getEmployees = async (employeesDataChange) => {
  return (
    await instance.get(`/employees/`)
      .then(resp => {
        employeesDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const getEmployeesById = async (empDataChange, empId) => {
  return (
    await instance.get(`/employees/${empId.id}`, {
      params: {
        expandPermission: true,
        expandRole: true
      }
    })
      .then(resp => {
        empDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

////Permissions

const getPermissions = async (permissionDataChange) => {
  return (
    await instance.get(`/permission/`)
      .then(resp => {
        permissionDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostPermissions = async (title, policies, render, setRender) => {
  await instance.post('/permission/', { title: title, policies: policies })
    .then(resp => {
      setRender(!render)
      succesPost()
    }).catch((err) => {
      error(err.message)
    });
}

const PutPermission = async (id, title, render, policies) => {
  await instance.put(`/permission/${id}`, { title: title, policies: policies, status: "published" })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message)
      return false
    });
}

/////Roles

const getRoles = async (roleDataChange) => {
  return (
    await instance.get(`/role/`)
      .then(resp => {
        roleDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostRoles = async (title, render, setRender, permission) => {
  await instance.post('/role/', { title: title, permission: permission })
    .then(resp => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutRoles = async (id, title, render, permission) => {
  await instance.put(`/role/${id}`, { title: title, permissions: permission, status: "published" })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message)
      return false
    });
}

//// Modules
const getModules = async (modulesDataChange) => {
  return (
    await instance.get(`/module/`)
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const getModulesTree = async (modulesDataChange) => {
  return (
    await instance.get(`/module/`, { params: { treeMode: true } })
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostModule = async (title, render, setRender, clientId, parentId) => {
  await instance.post('/module/', { title: title, clientId: clientId, parentId: parentId })
    .then(resp => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutModule = async (id, title, render) => {
  await instance.put(`/module/${id}`, { title: title, status: "published" })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message)
      return false
    });
}

////Policy

const getPolicy = async (policiesDataChange) => {
  return (
    await instance.get(`/policy/`)
      .then(resp => {
        policiesDataChange(resp.data);
      }).catch((err) => {
        error(err.message);
      })
  )
}

const PostPolicy = async (render, setRender, actionId, moduleId) => {
  await instance.post('/policy/', { actionId: actionId, moduleId: moduleId })
    .then(resp => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutPolicy = async (id, actions, render, setRender) => {
  await instance.put(`/policy/${id}`, { actions: actions, status: "published" })
    .then(resp => {
      // setRender(!render)
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message);
      return false;
    });
}

export { login, getActions, PostActions, PutActions, getClients, PostClients, PutClients, getEmployees, getEmployeesById, getPermissions, PostPermissions, PutPermission, getRoles, PostRoles, PutRoles, getModules, getModulesTree, PostModule, PutModule, getPolicy, PostPolicy, PutPolicy };