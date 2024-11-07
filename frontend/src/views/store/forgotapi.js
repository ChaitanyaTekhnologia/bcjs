import axios from 'axios';
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

export const changePassword= async (value) => {
    try {     
    const response = await axios.post('http://localhost:3002/changepassword', value)
     return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error; 
    }
  };


  export const verifyotp= async (value) => {
    try {     
      const response = await axios.post('http://localhost:3002/verifyotp', value);
     return response.data;
    } catch (error) {
      console.error("Error ", error);
      throw error; 
    }
  };

