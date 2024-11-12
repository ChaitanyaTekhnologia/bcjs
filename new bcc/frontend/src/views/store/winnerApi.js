// import axios from 'axios';
// import { apiurl } from '../../Api/apiurl';

// const API_BASE_URL = apiurl;

// export const winnerdetails = async (value) => {
//   try {
//     const shemeMember = await axios.post(`${API_BASE_URL}/winnerscheme`, value);
//     console.log(shemeMember.data.data);
//     return shemeMember.data.data; 
//   } catch (error) {
//     return null;
//   }
// };


import axios from 'axios';
import { apiurl } from '../../Api/apiurl';

const API_BASE_URL = apiurl;

export const winnerdetails = async (value) => {
  try {
    const shemeMember = await axios.post(`${API_BASE_URL}/winnerscheme`, value);
    console.log(shemeMember.data.data);
    return shemeMember.data.data; 
  } catch (error) {
    return null;
  }
};
