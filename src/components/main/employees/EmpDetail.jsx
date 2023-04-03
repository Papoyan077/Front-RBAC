import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./employees.css"
import { getEmployeesById } from "../../../utils/Route";

const EmpDetail = () => {
    let empid = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        getEmployeesById(empdatachange , empid)
    }, [empid]);
    console.log(empdata.permissions);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "10px",
            marginTop: "10px",
            width: "100vw",
            height: "85vh"
        }}>
            <div className="card-title">
                <h2>Employees</h2>
            </div>
            <div className="border-blue" style={{width: "100%", height: "100%", overflow: "scroll"}}>
                <div style={{margin: "20px"}}>
                    <div className="card-body">
                        {empdata &&
                            <div>
                                <h2>FirstName : {empdata.firstName}</h2>
                                <h5>LastName : {empdata.lastName}</h5>
                                <h5>username : {empdata.userName}</h5>
                                <h2>Permissions :
                                    {
                                    empdata.permission?.map(perm => {
                                        console.log(perm.title);
                                        return (<>
                                            <span>{perm.title} </span>
                                        </>)
                                    })
                                }</h2>
                            </div>
                        }
                        <Link to="/general/employees">Back to Listing</Link>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default EmpDetail;