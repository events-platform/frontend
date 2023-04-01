import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./reducers/test";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
const reducer = {
  login: testReducer
};

const preloadedState = {
  login: {
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
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
