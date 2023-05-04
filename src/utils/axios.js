import axios from "axios";
const BASE_URL = 'http://localhost:8081/';
let JWTTOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJhZG1pbiIsImlhdCI6MTY3ODQ0NjU1Mn0.vsg37gZ-pPRq4qDKrTg9mswSuZ3Ij1RjRBiJ9mafig4';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { 'Authorization': 'Bearer ' + JWTTOKEN }
});

export default instance;

