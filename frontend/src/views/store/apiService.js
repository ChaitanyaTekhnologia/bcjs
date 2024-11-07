import axios from "axios";
import { apiurl } from "../../Api/apiurl";
const API_BASE_URL = apiurl;

export const createBidding = async (newPayment) => {
  const response = await axios.post(`${API_BASE_URL}/addbidding`, newPayment);
  return response.data;
};

export const createPaymentApi = async (newPayment) => {
  const response = await axios.post(
    `${API_BASE_URL}/createpayment`,
    newPayment
  );
  return response.data;
};

export const fetchMasterData = async () => {
  const response = await axios.get(`${API_BASE_URL}/getmember`);
  return response.data;
};

export const fetchPaymentsByMonthSchemeApi = async (newPayment) => {
  const response = await axios.post(`${API_BASE_URL}/geroutert`, newPayment);
  return response.data;
};

export const deleteMember = async (id) => {
  try {
    await axios.post(`${API_BASE_URL}/deletemember`, id);
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const addbidding = async (value) => {
  try {
    await axios.post(`${API_BASE_URL}/addbidding`, value);
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const fetchmemberData = async (value) => {
  try {
    await axios.post(`${API_BASE_URL}/addbidding`, value);
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const deletescheme = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/deletescheme`, value);
    return response.data;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const loginUser = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, value);
    return response.data;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const checkMember = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/w`, value);
    return response;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

// export const checkWinner1 = async (value) => {
//   try {
//     console.log("Request payload:", value);
//     const response = await axios.post(`${API_BASE_URL}/w1`, value);
//     return response;
//   } catch (error) {
//     console.error("Error checking winner: ", error);
//     throw error;
//   }
// };

export const winnerLastmonth = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reportlastmonth`, value);
    return response;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const getDataId = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bidbcdateid`, value);
    return response;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const updatebcstatus = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/updatstatus`, value);
    return response;
  } catch (error) {
    console.error("Error deleting member: ", error);
    throw error;
  }
};

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scheme`);
    return response.data.dat;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const fetchWinner = async (value) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/scheme`, value);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const sendWinnerNameMessge = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendwinner`, value);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const sendWinnerinfo = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendwinnerinfo`, value);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const sendDateMessge = async (value) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/senddate`, value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const getbcNo = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getbcno`, value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const sendbcdatemessge = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendbcdate`, value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};


export const sendReceviedPayment = async (value) => {
  try {
    console.log(value)
    const response = await axios.post(`${API_BASE_URL}/crediteamount`, value);
    console.log(response)
    return response.data;

  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const sendPayPayment = async (value) => {
  try {
    console.log(value)
    const response = await axios.post(`${API_BASE_URL}/deabiteamount`, value);
    console.log(response)
    return response.data;

  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};


export const checkstatus = async (value) => {
  try {
    console.log(value)
    const response = await axios.post(`${API_BASE_URL}/checkstatus_of_scheme`, {sch_id:value});
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};


export const totalbalanceagency = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/totalbalanceagency`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};

export const Updateschnamename = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/updatename`,value);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};


export const currentbalance = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reportmember`,value);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};


export const bcstatus = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bcstatus`,value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};



export const fetchbcdateandbcno = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/getbcdatebcno`,value);
 
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};


export const fetchdreportdatadatewise = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/datywisereport`,value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};



export const transferamount = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember68`,value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};



export const fetchnoofmember = async (value) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/noofmonth`,value);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } 
};