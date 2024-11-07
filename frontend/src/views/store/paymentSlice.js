// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// import {apiurl} from '../../Api/apiurl'
// const API_BASE_URL = apiurl;

// // Async thunk for creating a new payment
// export const createPayment = createAsyncThunk(
//   "payments/createPayment",
//   async (newPayment, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/trasactionentrymember7`,
//         newPayment
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating payment:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Async thunk for creating another payment
// export const createPayment1 = createAsyncThunk(
//   "payments/createPayment1",
//   async (newPayment, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/trasactionentrymember6`,
//         newPayment
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error creating payment1:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Async thunk for fetching payments based on a name scheme
// export const fetchPaymentsonunamescheme = createAsyncThunk(
//   "payments/fetchPaymentsonunamescheme",
//   async (newPayment, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/geroutertpaymentname`,
//         newPayment
//       );
//       return response.data.data;
//     } catch (error) {
//       console.error("Error fetching payments:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// // Async thunk for sending additional data
// export const sendAdditionalData = createAsyncThunk(
//   "payments/sendAdditionalData",
//   async (additionalData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/winnerentryvoucher`,
//         additionalData
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error sending additional data:", error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message
//       );
//     }
//   }
// );

// const initialState = {
//   payments: [],
//   status: "idle",
//   error: null,
// };

// const paymentSlice = createSlice({
//   name: "payments",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle createPayment cases
//       .addCase(createPayment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createPayment.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.payments.push(action.payload);
//       })
//       .addCase(createPayment.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Handle createPayment1 cases
//       .addCase(createPayment1.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createPayment1.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.payments.push(action.payload);
//       })
//       .addCase(createPayment1.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Handle fetchPaymentsonunamescheme cases
//       .addCase(fetchPaymentsonunamescheme.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPaymentsonunamescheme.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.payments = action.payload;
//       })
//       .addCase(fetchPaymentsonunamescheme.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       // Handle sendAdditionalData cases
//       .addCase(sendAdditionalData.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(sendAdditionalData.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // If the response should update the payments list, add the new data
//         // state.payments.push(action.payload);
//       })
//       .addCase(sendAdditionalData.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default paymentSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { apiurl } from "../../Api/apiurl";
const API_BASE_URL = apiurl;

// Async thunk for creating a new payment
export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (newPayment, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/trasactionentrymember7`,
        newPayment
      );
      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for creating another payment
export const createPayment1 = createAsyncThunk(
  "payments/createPayment1",
  async (newPayment, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/trasactionentrymember6`,
        newPayment
      );
      return response.data;
    } catch (error) {
      console.error("Error creating payment1:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for fetching payments based on a name scheme
export const fetchPaymentsonunamescheme = createAsyncThunk(
  "payments/fetchPaymentsonunamescheme",
  async (newPayment, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/geroutertpaymentname`,
        newPayment
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching payments:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for sending additional data
export const sendAdditionalData = createAsyncThunk(
  "payments/sendAdditionalData",
  async (additionalData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/winnerentryvoucher`,
        additionalData
      );
      return response.data;
    } catch (error) {
      console.error("Error sending additional data:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const initialState = {
  payments: [],
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearState: (state) => {
      state.payments = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createPayment cases
      .addCase(createPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle createPayment1 cases
      .addCase(createPayment1.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPayment1.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments.push(action.payload);
      })
      .addCase(createPayment1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle fetchPaymentsonunamescheme cases
      .addCase(fetchPaymentsonunamescheme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentsonunamescheme.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsonunamescheme.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle sendAdditionalData cases
      .addCase(sendAdditionalData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendAdditionalData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // If the response should update the payments list, add the new data
        // state.payments.push(action.payload);
      })
      .addCase(sendAdditionalData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearState } = paymentSlice.actions;

export default paymentSlice.reducer;
