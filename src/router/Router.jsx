import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Login from "../components/login/Login";
import PrivateRoutes from "../utils/PrivateRoutes";
import Employees from "../components/main/employees/Employees";
import EmpDetail from "../components/main/employees/EmpDetail";
import Clients from "../components/main/client/Clients"
import Modules from "../components/main/modules/Modules";
import Roles from "../components/main/roles/Roles";
import Permissions from "../components/main/permissions/Permissions";
import Policies from "../components/main/policies/Policies";
import Layout from "../layout/Layout";
import Activity from "../components/main/activity/Activity";
import { getCookie, getCookieForReturn } from "../components/login/LoginAcces";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route>
                <Route element={<PrivateRoutes />}>
                    <Route exact path="/" element={<Layout />}>
                        <Route index={'employees'} element={<Employees />} />
                        <Route path={'employees'} element={<Employees />} />
                        <Route path='detail/:id' element={<EmpDetail />}></Route>
                        <Route path="clients" element={<Clients />} />
                        <Route path="modules" element={<Modules />} />
                        <Route path="permissions" element={<Permissions />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="activity" element={<Activity />} />
                        <Route path="policies" element={<Policies />} />
                    </Route>
                </Route>
                    {getCookieForReturn('token') ?  getCookie('token') : <Route path="/login" element={<Login />} />}
            </Route>
        </>
    )
);
export default router;