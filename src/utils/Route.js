import { getCookie, setCookie } from "../components/login/LoginAcces";
import { error, loginError, succesLogin, succesPost, succesPut } from "./Messages";
import instance from "./axios";

const login = async (username, password, navigate) => {
  instance.post(`/login/`, { "login": username, "password": password })
    .then(resp => {
      setCookie('token', resp.data.token, 1800000);
      if (resp.status === 200) {
        succesLogin(username)
        navigate("/")
      }
    }).catch(() => {
      loginError()
    })
};

////Actions
const getActivity = async (ActivityDataChange) => {
  return (
    await instance.get('/activity/', { headers: { "Authorization": `Bearer ${getCookie('token')}` } }).then(resp => {
      return ActivityDataChange(resp.data);
    }).catch((err) => {
      error(err.message)
    })
  )
};

const PostActivity = async (title, render, setRender) => {
  await instance.post('/activity/', { title: title }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message)
    });
}

const PutActivity = async (id, title, render) => {
  await instance.put(`/activity/${id}`, { title: title, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
    await instance.get('/client/', { headers: { "Authorization": `Bearer ${getCookie('token')}` } }).then(resp => {
      clientDataChange(resp.data);
      return true
    }).catch((err) => {
      error(err.message)
      return false
    })
  )
}

const PostClients = async (title, render, setRender) => {
  await instance.post('/client/', { title: title }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost()
    }).catch((err) => {
      error(err.message)
    });
}

const PutClients = async (id, title, render) => {
  await instance.put(`/client/${id}`, { title: title, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
    await instance.get(`/employees/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
      headers: {
        "Authorization": `Bearer ${getCookie('token')}`
      },
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
    await instance.get(`/permission/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
      .then(resp => {
        permissionDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostPermissions = async (title, policies, render, setRender) => {
  await instance.post('/permission/', { title: title, policies: policies }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost()
    }).catch((err) => {
      error(err.message)
    });
}

const PutPermission = async (id, title, render, policies) => {
  await instance.put(`/permission/${id}`, { title: title, policies: policies, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
    await instance.get(`/role/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
      .then(resp => {
        roleDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostRoles = async (title, render, setRender, permission) => {
  await instance.post('/role/', { title: title, permission: permission }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutRoles = async (id, title, render, permission) => {
  await instance.put(`/role/${id}`, { title: title, permissions: permission, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
    await instance.get(`/module/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const getModuleById = async (setModuleDataById, moduleId) => {
  return (
    await instance.get(`/module/${moduleId}`, {
      headers: {
        "Authorization": `Bearer ${getCookie('token')}`
      },
    })
      .then(resp => {
        setModuleDataById(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const getModulesTree = async (modulesDataChange) => {
  return (
    await instance.get(`/module/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` }, params: { treeMode: true } })
      .then(resp => {
        modulesDataChange(resp.data);
      }).catch((err) => {
        error(err.message)
      })
  )
}

const PostModule = async (title, render, setRender, clientId, parentId, activity) => {
  await instance.post('/module/', { title: title, clientId: clientId, parentId: parentId, activities: activity }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutModule = async (id, title, render, activity) => {
  await instance.put(`/module/${id}`, { title: title, activity: activity, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
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
    await instance.get(`/policy/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
      .then(resp => {
        policiesDataChange(resp.data);
      }).catch((err) => {
        error(err.message);
      })
  )
}

const getPolicyPermission = async (policiesDataChange) => {
  return (
    await instance.get(`/policyPermission/`, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
      .then(resp => {
        policiesDataChange(resp.data);
      }).catch((err) => {
        error(err.message);
      })
  )
}

const PostPolicy = async (render, setRender, actionId, moduleId) => {
  await instance.post('/policy/', { actionId: actionId, moduleId: moduleId }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      setRender(!render)
      succesPost();
    }).catch((err) => {
      error(err.message);
    });
}

const PutPolicy = async (id, activities, render) => {
  await instance.put(`/policy/${id}`, { activities: activities, status: "published" }, { headers: { "Authorization": `Bearer ${getCookie('token')}` } })
    .then(() => {
      succesPut();
      return !render
    }).catch((err) => {
      error(err.message);
      return false;
    });
}

export { login, getActivity, PostActivity, PutActivity, getClients, PostClients, PutClients, getEmployees, getEmployeesById, getPermissions, PostPermissions, PutPermission, getRoles, PostRoles, PutRoles, getModules, getModuleById , getModulesTree, PostModule, PutModule, getPolicy, getPolicyPermission, PostPolicy, PutPolicy };