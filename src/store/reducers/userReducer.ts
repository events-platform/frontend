import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface userState {
  token: string,
  username: string,
  isSignedIn: boolean,
  avatarUrl: string
}
const initialState:userState = {
  token: "",
  username: "Дядя Богдан",
  isSignedIn: false,
  avatarUrl: ""
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
    },
    setAvatarUrl (state, action: PayloadAction<string>) {
      state.avatarUrl = action.payload;
    }
  }
});

export default userReducer.reducer;
export const { setToken, setUserName, logoutUser, setSignIn, setAvatarUrl } = userReducer.actions;
