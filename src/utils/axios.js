import axios from "axios";
import { getCookie } from "../components/login/LoginAcces";
const BASE_URL = 'http://localhost:8081/';

const getJwt = () => {
  return getCookie('token');
};


const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Authorization': 'Bearer ' + getJwt() }
});

export default instance;