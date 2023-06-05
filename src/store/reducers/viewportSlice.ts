import { createSlice } from "@reduxjs/toolkit";

const viewportSlice = createSlice({
  name: "viewport",
  initialState: {
    viewportWidth: window.innerWidth
  },
  reducers: {
    updateViewportWidth: (state, action) => {
      state.viewportWidth = action.payload;
    }
  }
});

export const { updateViewportWidth } = viewportSlice.actions;
export default viewportSlice.reducer;
