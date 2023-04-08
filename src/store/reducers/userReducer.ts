import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userState {
  token: string,
  username: string,
  isSignedIn: boolean
}
const initialState:userState = {
  token: "",
  username: "Дядя Богдан",
  isSignedIn: false
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken (state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserName (state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    logoutUser (state) {
      state.token = "";
      state.username = "";
      state.isSignedIn = false;
    },
    setSignIn (state, action: PayloadAction<boolean>) {
      state.isSignedIn = action.payload;
    }
  }
});

export default userReducer.reducer;
export const { setToken, setUserName, logoutUser, setSignIn } = userReducer.actions;
