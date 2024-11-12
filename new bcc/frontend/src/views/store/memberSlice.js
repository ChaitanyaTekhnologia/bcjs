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
  'members/fetchMembers',
  async (value) => {
    const response = await axios.post(`${API_BASE_URL}/shemewisememberinformation`, value);
    return response.data.data;
  }
);

// Async thunk for fetching all members
export const fetchAllMembers = createAsyncThunk(
  'members/fetchAllMembers',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/getmembername`);
    return response.data.data;
  }
);

// Async thunk for creating a new member
export const createMember = createAsyncThunk('members/createMember', async (newMember) => {
  const response = await axios.post(`${API_BASE_URL}/createmember`, newMember);
  return response.data;
});

// Async thunk for updating a member
export const updateMember = createAsyncThunk('members/updateMember', async (updatedMember) => {
  const { id, ...memberData } = updatedMember;
  const response = await axios.put(`${API_BASE_URL}/updatemember/${id}`, memberData);
  return response.data;
});

// Async thunk for deleting a member from scheme
export const deleteMemberFromScheme = createAsyncThunk(
  'members/deleteMemberFromScheme',
  async (v) => {
    const response = await axios.post(`${API_BASE_URL}/deletefromtbls`, v);
    return response.data;
  }
);

// Async thunk for deleting a member
export const deleteMember = createAsyncThunk('members/deleteMember', async (memberId) => {
  await axios.delete(`${API_BASE_URL}/deletemember/${memberId}`);
  return memberId;
});

const memberSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    clearMembers: (state) => {
      state.members = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMembers cases
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
      // Handle fetchAllMembers cases
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
      // Handle createMember cases
      .addCase(createMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = [...state.members, action.payload];
      })
      .addCase(createMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle updateMember cases
      .addCase(updateMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.members.findIndex(member => member.id === action.payload.id);
        if (index !== -1) {
          state.members[index] = action.payload;
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle deleteMemberFromScheme cases
      .addCase(deleteMemberFromScheme.fulfilled, (state, action) => {
        state.members = state.members.filter(
          member => member.member_id !== action.payload.member_id
        );
      })
      .addCase(deleteMemberFromScheme.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle deleteMember cases
      .addCase(deleteMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.members = state.members.filter(member => member.id !== action.payload);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearMembers } = memberSlice.actions;

export default memberSlice.reducer;
