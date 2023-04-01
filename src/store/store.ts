import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducers/test";
import userReducer from "./reducers/userReducer";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
const reducer = {
  test: testReducer,
  user: userReducer
};

const preloadedState = {
  test: {
    value: 10
  },
  visibilityFilter: "SHOW_COMPLETED"
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
