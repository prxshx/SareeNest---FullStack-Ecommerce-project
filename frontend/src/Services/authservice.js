import axios from 'axios';


const baseUrl = "http://localhost:8080/auth";;

export const login = (data)=>{
   return axios.post(`${baseUrl}/login`,data);
}

export const register = (data)=>{
    return axios.post(`${baseUrl}/register`,data);
}