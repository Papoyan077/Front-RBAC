import { createBrowserRouter, Route, createRoutesFromElements } from "react-router-dom";
import Login from "../components/login/Login";
import PrivateRoutes from "../utils/PrivateRoutes";
import General from "../components/main/General";
import Employees from "../components/main/employees/Employees";
import EmpDetail from "../components/main/employees/EmpDetail";
import Clients from "../components/main/client/Clients"
import Modules from "../components/main/modules/Modules";
import Roles from "../components/main/roles/Roles";
import Actions from "../components/main/action/Actions";
import Permissions from "../components/main/permissions/Permissions";
import Policies from "../components/main/policies/Policies";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route>
                <Route  element={<PrivateRoutes />}>
                    <Route path="/general" element={<General />}>
                        <Route index={'employees'} element={<Employees />} />
                        <Route path={'employees'} element={<Employees />} />
                        <Route path='detail/:id' element={<EmpDetail />}></Route>
                        <Route path="clients" element={<Clients />} />
                        <Route path="modules" element={<Modules />} />
                        <Route path="permissions" element={<Permissions />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="actions" element={<Actions />} />
                        <Route path="policies" element={<Policies/>} />
                        </Route>
                    </Route>
                <Route path="/" element={<Login />} />
            </Route>
        </>
    )
);
export default router;

