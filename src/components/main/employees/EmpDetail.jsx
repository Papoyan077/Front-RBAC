import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./employees.css"
import { Box } from "@mui/material";
import instance from "../../../utils/axios";

const EmpDetail = () => {
    let empid = useParams();
    const [empdata, empdatachange] = useState([]);

    useEffect(() => {
        instance.get(`/employees/${empid.id}` , {params: {
                expandPermission : true
            }})
            .then(resp => {
                empdatachange(resp.data);
            }).catch((err) => {
            console.log(err.message);
        })
    }, [empid]);
    console.log(empdata);
    return (
        <div style={{display:"flex",flexDirection:"column",marginRight:"10px", marginTop:"10px",width:"100vw",height:"85vh"}}>
            <div className="card-title">
                <h2>Employee Detail</h2>
            </div>
            <Box sx={{border: 1, backgroundColor:"white",borderColor: 'primary.main', borderRadius:4, boxShadow:4,width:"100%",height:"100%"}}>
                <Box sx={{margin:4}}>
                    <div className="card-body">
                        {empdata &&
                            <div>
                                <h2>FirstName : {empdata.firstName}</h2>
                                <h5>LastName : {empdata.lastName}</h5>
                                <h5>username : {empdata.username}</h5>
                                <Link className="btn btn-danger" to="/general/employees">Back to Listing</Link>
                            </div>
                        }
                    </div>
                </Box>
            </Box>
        </div >
    );
}
export default EmpDetail;