import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEmployeesById } from "../../../utils/Route";
import { Button } from "antd";
import AddEmployeeRole from "./AddEmployeeRole";
import AddEmployeePermission from "./AddEmployeePermission";
import EmployeePermissions from "./EmployeePermissions";
import EmployeeRoles from "./EmployeeRoles";

const EmpDetail = () => {
    const [render, setRender] = useState(false);
    let employeeId = useParams();
    const [employeeData, setEmployeeData] = useState({});

    useEffect(() => {
        async function fetchData() {
            await getEmployeesById(setEmployeeData, employeeId)
        }
        fetchData();
        // setRender(!render)
    }, [render]);

    return (
        <div className='main'>
            <div className='mainTitle'>
                <div className='mainTitleText'>
                    <Link
                        to="/employees"><Button>Back</Button>
                    </Link>
                    <div className='d-flex'>
                        <span className='d-flex'>Employee :</span>
                        {employeeData &&
                            <div>
                                <div className='d-flex'>
                                    <span>{employeeData.firstName}</span>
                                    <span className='ml-5'>{employeeData.lastName}</span>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='main'>
                <div className='mainDetail'>
                    <div className='detailMain'>
                        <span>
                            Permissions
                        </span>
                        <AddEmployeePermission employeeData={employeeData} render={render} setRender={setRender} />
                    </div>
                    <EmployeePermissions employeeData={employeeData} render={render} setRender={setRender}/>
                </div>
                <div className='mainDetail'>
                    <div className='detailMain'>
                        <span>
                            Roles
                        </span>
                        <AddEmployeeRole employeeData={employeeData} render={render} setRender={setRender} />
                    </div>
                    <EmployeeRoles employeeData={employeeData} render={render} setRender={setRender}/>
                </div>
            </div>
        </div>
    );
}
export default EmpDetail;