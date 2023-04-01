import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface loginState {
  value: number
}
const initialState:loginState = { value: 0 };

const testReducer = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment (state) {
      state.value++;
    },
    decrement (state) {
      state.value--;
    },
    incrementByAmount (state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  }
});

export default testReducer.reducer;
export const { increment, decrement, incrementByAmount } = testReducer.actions;
