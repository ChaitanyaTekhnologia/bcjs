import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

// Async thunk for fetching total amount of scheme
export const fetchTotalAmountScheme = createAsyncThunk(
  'bSlice/fetchTotalAmountScheme',
  async (nevalue) => {
    const response = await axios.post(`${API_BASE_URL}/totalamountscheme`, nevalue);
console.log(response)
    return response.data.data[0].sch_fiexd_total;
  }
);

// Async thunk for fetching scheme-wise member names
export const fetchSchemewiseName = createAsyncThunk(
  'bSlice/fetchSchemewiseName',
  async (nevalue) => {
  
    console.log(nevalue)
    const response = await axios.post(`${API_BASE_URL}/getmemberschemename`, nevalue);

    return response.data.data;
  }
);

// Async thunk for creating a new bid
export const createBidding = createAsyncThunk(
  'bSlice/createBidding',
  async (newPayment) => {
    const response = await axios.post(`${API_BASE_URL}/addbidding`, newPayment);

    return response.data;
  }
);

// Async thunk for adding a winner
export const addentryvoucher = createAsyncThunk(
  'bSlice/addWinner',
  async (newPayment) => {
    console.log()
    const response = await axios.post(`${API_BASE_URL}/winnerentryvoucher`, newPayment);


    return response.data;
  }
);

// Async thunk for fetching member data
export const fetchMemberData = createAsyncThunk(
  'bSlice/fetchMemberData',
  async (nevalue) => {
    const response = await axios.post(`${API_BASE_URL}/biddingdata`, nevalue);

    return response.data.data;
  }
);

// Async thunk for fetching winner data
export const fetchWinner = createAsyncThunk(
  'bSlice/fetchWinner',
  async (value) => {
    const response = await axios.post(`${API_BASE_URL}/winner`, value);
    return response.data.data;
  }
);

// Async thunk for deleting a bid
export const fetchBidding = createAsyncThunk(
  'bSlice/deleteBidding',
  async (v1) => {
   
    const response = await axios.post(`${API_BASE_URL}/getmemberschemenamebidding`,v1);
   console.log("sdfgh")
   console.log(response)
   console.log("first")

    return response.data.data;
  }
);

// Additional createTransaction async thunks
export const createTransaction1 = createAsyncThunk(
  'transaction/createTransaction1',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember1`, newTransaction);

    return response.data;
  }
);

export const createTransaction2 = createAsyncThunk(
  'transaction/createTransaction2',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember2`, newTransaction);

    return response.data;
  }
);

export const createTransaction3 = createAsyncThunk(
  'transaction/createTransaction3',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember3`, newTransaction);

    return response.data;
  }
);

export const createTransaction4 = createAsyncThunk(
  'transaction/createTransaction4',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember4`, newTransaction);
    console.log(response.data);
    return response.data;
  }
);

export const createTransaction5 = createAsyncThunk(
  'transaction/createTransaction5',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember5`, newTransaction);
  
    return response.data;
  }
);

export const createTransaction8 = createAsyncThunk(
  'transaction/createTransaction8',
  async (newTransaction) => {
    const response = await axios.post(`${API_BASE_URL}/trasactionentrymember8`, newTransaction);

    return response.data;
  }
);

const bSlice = createSlice({
  name: 'bSlice',
  initialState: {
    total: 0,
    loading: false,
    error: null,
    memberData: [],
    memberBiddingName: [],
    memberName: [],
    winners: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchTotalAmountScheme cases
      .addCase(fetchTotalAmountScheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalAmountScheme.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload;
      })
      .addCase(fetchTotalAmountScheme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchMemberData cases
      .addCase(fetchMemberData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberData.fulfilled, (state, action) => {
        state.loading = false;
        state.memberData = action.payload;
      })
      .addCase(fetchMemberData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchSchemewiseName cases
      .addCase(fetchSchemewiseName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchemewiseName.fulfilled, (state, action) => {
        state.loading = false;
        state.memberName = action.payload;
      })
      .addCase(fetchSchemewiseName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchWinner cases
      .addCase(fetchWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinner.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload;
      })
      .addCase(fetchWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createBidding cases
      .addCase(createBidding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBidding.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.memberData)) {
          state.memberData = [...state.memberData, action.payload];
        } else {
          state.memberData = [action.payload];
        }
      })
      .addCase(createBidding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle addWinner cases
      .addCase(addentryvoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addentryvoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = [...state.winners, action.payload];
      })
      .addCase(addentryvoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle deleteBidding cases
      .addCase(fetchBidding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidding.fulfilled, (state, action) => {
        state.loading = false;
        state.memberBiddingName = action.payload;
      })
      .addCase(fetchBidding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle createTransaction cases
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
      })
      // Handle createTransaction8 cases
      .addCase(createTransaction8.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction8.fulfilled, (state) => {
        state.loading = false;
        // Handle success if needed
      })
      .addCase(createTransaction8.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bSlice.reducer;
