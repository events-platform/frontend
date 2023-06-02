import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import viewportReducer from "./reducers/viewportSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

const preloadedState = {
};

export const store = configureStore({
  reducer: {
    viewport: viewportReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
