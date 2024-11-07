
import { createSlice } from '@reduxjs/toolkit'

// Define the initial state
const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false, // Add this line
  theme: 'light',
}

// Create a slice of the state with a reducer
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload }
    },
  },
})

// Export the action creators and the reducer
export const { set } = uiSlice.actions
export default uiSlice.reducer