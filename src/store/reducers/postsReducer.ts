import { createSlice } from "@reduxjs/toolkit";
import { Ipost } from "../../API/post";

interface IinitialState {
  favorite: Ipost[]
}
const initialState: IinitialState = {
  favorite: []
};
const posts = createSlice({
  name: "favoritePosts",
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      state.favorite = action.payload;
    }
  }
});

export const { updateFavorites } = posts.actions;
export default posts.reducer;
