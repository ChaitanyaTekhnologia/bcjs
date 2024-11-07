import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiurl } from '../../Api/apiurl';

export const fetchSchemes = createAsyncThunk('schemes/fetchSchemes', async () => {
  const response = await axios.get(`${apiurl}/scheme`);
  return response.data.data;
});

const schemeSlice1 = createSlice({
  name: 'schemes',
  initialState: {
    schemes: [],
    loading: false,
    error: null,
    selectedSchemeId: null,
  },
  reducers: {
    setSchemeId: (state, action) => {
      state.selectedSchemeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchemes.fulfilled, (state, action) => {
        state.schemes = action.payload;
        state.loading = false;
      })
      .addCase(fetchSchemes.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Error fetching schemes';
      });
  },
});

export const { setSchemeId } = schemeSlice1.actions;

export default schemeSlice1.reducer;
