// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { apiurl } from '../../Api/apiurl';
// const API_BASE_URL = apiurl;

// export const sendOtp = createAsyncThunk(
//   'forgotPassword/sendOtp',
//   async (value, { rejectWithValue }) => {
//     try {
//       console.log(value);
//       const response = await axios.post(`${API_BASE_URL}/sendotp`, value);
//       console.log(response.data.status);
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue({ message: 'Something went wrong' });
//       }
//     }
//   }
// );

// const forgotPasswordSlice = createSlice({
//   name: 'forgotPassword',
//   initialState: {
//     status: 'idle',
//     data: [],
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendOtp.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(sendOtp.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.data = action.payload;
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// export default forgotPasswordSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../../Api/apiurl';
const API_BASE_URL = apiurl;

export const sendOtp = createAsyncThunk(
  'forgotPassword/sendOtp',
  async (value, { rejectWithValue }) => {
    try {
      console.log(value);
      const response = await axios.post(`${API_BASE_URL}/sendotp`, value);

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);

export const confirmOtp = createAsyncThunk(
  'forgotPassword/confirmOtp',
  async (value, { rejectWithValue }) => {
    try {
      console.log(value)
      const response = await axios.post(`${API_BASE_URL}/verifyotp`, value);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: 'Something went wrong' });
      }
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    status: 'idle',
    data: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(confirmOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(confirmOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default forgotPasswordSlice.reducer;
