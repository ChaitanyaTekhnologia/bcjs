

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

const initialState = {
  members: [],
  members1: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching members based on scheme
export const fetchMembers = createAsyncThunk(
  'member/fetchMembers',
  async (value) => {
    const response = await axios.post(`${API_BASE_URL}/shemewisememberinformation`, value);
    return response.data.data;
  }
);

// Async thunk for fetching all members
export const fetchAllMembers = createAsyncThunk(
  'member/fetchAllMembers',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/getmembername`);
    return response.data.data;
  }
);

// Async thunk for adding a new member
export const addMember = createAsyncThunk(
  'member/addMember',
  async (newMember) => {
    const response = await axios.post(`${API_BASE_URL}/ad`, newMember);
    return response.data;
  }
);

// Async thunk for deleting a member from scheme
export const deletememberScheme = createAsyncThunk(
  'member/deletememberScheme',
  async (v) => {
    const response = await axios.post(`${API_BASE_URL}/deletefromtbls`, v);
    return response.data;
  }
);

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    clearMembers: (state) => {
      state.members = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.members = [...state.members, action.payload];
      })
      .addCase(fetchAllMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members1 = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deletememberScheme.fulfilled, (state, action) => {
        state.members = state.members.filter(
          member => member.member_id !== action.payload.member_id
        );
      })
      .addCase(deletememberScheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearMembers } = memberSlice.actions;

export default memberSlice.reducer;
