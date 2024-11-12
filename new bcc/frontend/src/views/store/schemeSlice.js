import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { apiurl } from '../../Api/apiurl';
const API_BASE_URL = apiurl;

// Async thunk for fetching schemes
export const fetchSchemes = createAsyncThunk('scheme/fetchSchemes', async () => {
  const response = await axios.get(`${API_BASE_URL}/schemes`);
  return response.data;
});

// Async thunk for creating a new scheme
export const createScheme = createAsyncThunk('scheme/createScheme', async (newScheme) => {
  const response = await axios.post(`${API_BASE_URL}/cretaescheme`, newScheme);
  return response.data;
});

// Async thunk for creating a new BC date
export const createBcdate = createAsyncThunk('scheme/createBcdate', async () => {
  const response = await axios.post(`${API_BASE_URL}/bcdate`);
  return response.data;
});

const schemeSlice = createSlice({
  name: 'scheme',
  initialState: {
    schemeId: null,
    schemes: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSchemeId: (state, action) => {
      state.schemeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchSchemes cases
      .addCase(fetchSchemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSchemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schemes = action.payload;
      })
      .addCase(fetchSchemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle createScheme cases
      .addCase(createScheme.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createScheme.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schemes.push(action.payload);
      })
      .addCase(createScheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle createBcdate cases
      .addCase(createBcdate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBcdate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.schemes.push(action.payload); // Adjust this if BC dates should be stored separately
      })
      .addCase(createBcdate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSchemeId } = schemeSlice.actions;
export default schemeSlice.reducer;
