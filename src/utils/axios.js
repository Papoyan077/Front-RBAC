import axios from "axios";
import { getCookie } from "../components/login/LoginAcces";
const BASE_URL = 'http://localhost:8080/';

// export const redirectToHomePage = () => {
//   let token = getCookie();
//   if (token) {
//     console.log(token);
    // return window.location = "/layout";
//   }
// }
// redirectToHomePage()


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default instance;