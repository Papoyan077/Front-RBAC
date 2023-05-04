import axios from "axios";
import { getCookie } from "../components/login/LoginAcces";
const BASE_URL = 'http://localhost:8080/';
let getcookies = getCookie('token');
let JWTTOKEN = getcookies;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'Authorization': 'Bearer ' + JWTTOKEN }
});

export default instance;

