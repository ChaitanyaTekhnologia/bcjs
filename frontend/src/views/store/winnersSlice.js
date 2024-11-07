



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;


const initialState = {
  winners: [],
  winnerSM: [],
  schemeNames: [],
  status: 'idle',
  error: null,
};

export const fetchWinnerDetails = createAsyncThunk(
  'winners/fetchWinnerDetails',
  async (value) => {
    const response = await axios.post(`${API_BASE_URL}/winnerdata1`, value);
    return response.data.data;
  }
);

export const fetchWinnerDetailsMS = createAsyncThunk(
  'winners/fetchWinnerDetailsMS',
  async (v) => {
    const response = await axios.post(`${API_BASE_URL}/winnerdata2`, v);
    return response.data.data;
  }
);

export const fetchSchemeName = createAsyncThunk(
  'winners/fetchSchemeName',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/getschemeName`);
    return response.data.data;
  }
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    clearState: (state) => {
      state.winners = [];
      state.winnerSM = [];
      state.schemeNames = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinnerDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinnerDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.winners = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchWinnerDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchWinnerDetailsMS.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWinnerDetailsMS.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.winnerSM = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchWinnerDetailsMS.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSchemeName.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchemeName.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schemeNames = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSchemeName.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearState } = winnersSlice.actions;

export default winnersSlice.reducer;
