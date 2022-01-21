import axios from 'axios'
import { API_URL } from './Api'

export default function requestApi() {
   
   const request = axios.create({
      baseURL: API_URL,
      headers: {
         'Authorization':`Bearer ${localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):null}`
      },
      responseType: 'json',
      socketPath: null,
      
   })

   return request;
}
