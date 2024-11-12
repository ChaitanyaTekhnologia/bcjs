// dateSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from "../../Api/apiurl";
const API_BASE_URL = apiurl;

export const fetchBcDateData = createAsyncThunk('date/fetchBcDateData', async (value) => {
  const response = await axios.post(`${API_BASE_URL}/fetchbcdatascheme`, value);
  return response.data.data;
});

export const updateBcDate = createAsyncThunk('date/updateBcDate', async ({ id, newDate }) => {
  await axios.post(`${API_BASE_URL}/updatedate`, {
    bcdate_id: id,
    date: newDate,
  });
  return { id, newDate };
});

const dateSlice = createSlice({
  name: 'date',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBcDateData.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateBcDate.fulfilled, (state, action) => {
        const { id, newDate } = action.payload;
        const index = state.findIndex((item) => item.bcdate_id === id);
        if (index !== -1) {
          state[index].bc_date = newDate;
        }
      });
  },
});

export default dateSlice.reducer;
