


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

// Async thunk for creating a new payment
export const createPayment = createAsyncThunk(
  "receipts/createPayment",
  async (newPayment, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/trasactionentrymember7`,
        newPayment
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  receipts: [],
  status: "idle",
  error: null,
};

const receiptSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createPayment cases
      .addCase(createPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.receipts = [...state.receipts, action.payload];
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default receiptSlice.reducer;
