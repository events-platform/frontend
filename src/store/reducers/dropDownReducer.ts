import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "isCalendarHide",
  initialState: false,
  reducers: {
    setCalendarHide: (state) => {
      return !state;
    }
  }
});

export const notificationsSlice = createSlice({
  name: "isNotificationsHide",
  initialState: false,
  reducers: {
    setNotificationsHide: (state) => {
      return !state;
    }
  }
});

export const { setNotificationsHide } = notificationsSlice.actions;
export const { setCalendarHide } = calendarSlice.actions;
