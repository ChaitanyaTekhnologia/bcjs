

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

const initialState = {
  reportData: [],
  reportData1: [],
  loading: false,
  error: null,
};

export const fetchReportData = createAsyncThunk(
  "report/fetchReportData",
  async (value) => {
    try {
      console.log("fetchReportData");
      const response = await axios.post(`${API_BASE_URL}/report`, { scheme_id: 8 });
      console.log("fetchReportData");
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAdditionalData1 = createAsyncThunk(
  "report/fetchAdditionalData",
  async (value) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reportmember1`, value);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    clearReport(state) {
      state.reportData = [];
      state.reportData1 = [];
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReportData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportData.fulfilled, (state, action) => {
        state.reportData = action.payload;
        state.loading = false;
      })
      .addCase(fetchReportData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAdditionalData1.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdditionalData1.fulfilled, (state, action) => {
        state.reportData1 = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdditionalData1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearReport, clearError } = reportSlice.actions;

export default reportSlice.reducer;
