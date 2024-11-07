import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {apiurl} from '../../Api/apiurl'
const API_BASE_URL = apiurl;

export const updateMember = createAsyncThunk(
  'selectedMember/updateMember',
  async (memberData, { rejectWithValue }) => {
    try {


      console.log(memberData)
      const response = await axios.put(`${API_BASE_URL}/memberupdate`, memberData);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  memberData: [],
  status: 'idle',
  error: null,
};

const selectedMemberSlice = createSlice({
  name: 'selectedMember',
  initialState,
  reducers: {
    setSelectedMember: (state, action) => {
      const memberIndex = state.memberData.findIndex(member => member.member_id === action.payload.member_id);
      if (memberIndex >= 0) {
        state.memberData[memberIndex] = action.payload;
      } else {
        state.memberData.push(action.payload);
      }
    },
    clearSelectedMember: (state) => {
      state.memberData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateMember.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const memberIndex = state.memberData.findIndex(member => member.member_id === action.payload.member_id);
        if (memberIndex >= 0) {
          state.memberData[memberIndex] = action.payload;
        } else {
          state.memberData.push(action.payload);
        }
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setSelectedMember, clearSelectedMember } = selectedMemberSlice.actions;

export default selectedMemberSlice.reducer;
