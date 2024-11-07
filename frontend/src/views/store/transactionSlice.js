
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

// Async thunks for creating new transactions
export const createTransaction1 = createAsyncThunk(
  'transaction/createTransaction1',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/addtransaction`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

export const createTransaction2 = createAsyncThunk(
  'transaction/createTransaction2',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/addtransaction`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

export const createTransaction3 = createAsyncThunk(
  'transaction/createTransaction3',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/addtransaction`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

export const createTransaction4 = createAsyncThunk(
  'transaction/createTransaction4',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/addtransaction`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

export const createTransaction5 = createAsyncThunk(
  'transaction/createTransaction5',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/addtransaction`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createTransaction1 cases
      .addCase(createTransaction1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction1.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createTransaction2 cases
      .addCase(createTransaction2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction2.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createTransaction3 cases
      .addCase(createTransaction3.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction3.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction3.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createTransaction4 cases
      .addCase(createTransaction4.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction4.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction4.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createTransaction5 cases
      .addCase(createTransaction5.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction5.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction5.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
