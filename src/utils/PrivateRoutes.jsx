// import axios from 'axios';
import {Outlet, Navigate} from 'react-router-dom';
// let BASE_URL = 'localhost:3000';
// let JWTTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsImlhdCI6MTY3ODQ0NjU1Mn0.vsg37gZ-pPRq4qDKrTg9mswSuZ3Ij1RjRBiJ9mafig4' ;


const PrivateRoutes = () => {
    
    let auth = {'token' : true}
    return(
        auth.token ? <Outlet/> : <Navigate to='/' />
    )
}


export default PrivateRoutes;