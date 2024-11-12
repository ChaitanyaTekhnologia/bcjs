
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the API base URL using process.env.REACT_APP_BACKEND_URL or default to 'http://localhost:3002'
// const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3002';

// const initialState = {
//   loading: false,
//   error: null,
//   success: false,
//   updates: [], // Array to store updates
// };

// // Async action for updating commission data
// export const updateCommission = createAsyncThunk(
//   "update/updateCommission",
//   async (dataToUpdate, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/updatecommission`, dataToUpdate);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async action for updating total data
// export const updateTotal = createAsyncThunk(
//   "update/updateTotal",
//   async (dataToUpdate, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/updatetotal`, dataToUpdate);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const updateSlice = createSlice({
//   name: "update",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateCommission.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateCommission.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.success = true;
//         // Add the updated data to the updates array
//         state.updates.push(action.payload);
//       })
//       .addCase(updateCommission.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })
//       .addCase(updateTotal.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateTotal.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.success = true;
//         // Add the updated data to the updates array
//         state.updates.push(action.payload);
//       })
//       .addCase(updateTotal.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export default updateSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

const initialState = {
loading: false,
error: null,
success: false,
updates: [], // Array to store updates
};

// Async action for updating commission data
export const updateCommission = createAsyncThunk(
"update/updateCommission",
async (dataToUpdate, { rejectWithValue }) => {
try {
// const response = await axios.post("http://localhost:3002/updatecommission", dataToUpdate);
const response = await axios.post(`${API_BASE_URL}/updatecommission`, dataToUpdate);
return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

// Async action for updating total data
export const updatetTotal = createAsyncThunk(
"update/updateTotal",
async (dataToUpdate, { rejectWithValue }) => {
try {
// const response = await axios.post("http://localhost:3002/updatotal", dataToUpdate);

const response = await axios.post(`${API_BASE_URL}/updatotal`, dataToUpdate);

return response.data;
} catch (error) {
return rejectWithValue(error.response.data);
}
}
);

const updateSlice = createSlice({
name: "update",
initialState,
reducers: {},
extraReducers: (builder) => {
builder
.addCase(updateCommission.pending, (state) => {
state.loading = true;
state.error = null;
state.success = false;
})
.addCase(updateCommission.fulfilled, (state, action) => {
state.loading = false;
state.error = null;
state.success = true;
// Add the updated data to the updates array
state.updates.push(action.payload);
})
.addCase(updateCommission.rejected, (state, action) => {
state.loading = false;
state.error = action.payload;
state.success = false;
})
.addCase(updatetTotal.pending, (state) => {
state.loading = true;
state.error = null;
state.success = false;
})
.addCase(updatetTotal.fulfilled, (state, action) => {
state.loading = false;
state.error = null;
state.success = true;
// Add the updated data to the updates array
state.updates.push(action.payload);
})
.addCase(updatetTotal.rejected, (state, action) => {
state.loading = false;
state.error = action.payload;
state.success = false;
});
},
});

export default updateSlice.reducer;