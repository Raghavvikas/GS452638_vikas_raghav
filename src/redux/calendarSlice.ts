import { createSlice } from "@reduxjs/toolkit";

interface Week {
  id: string;
  month: string;
  weekNumber: number;
}

interface CalendarState {
  weeks: Week[];
}

// Dummy Data: Grouped weeks by month
const initialState: CalendarState = {
  weeks: [
    { id: "2024-01-W1", month: "January", weekNumber: 1 },
    { id: "2024-01-W2", month: "January", weekNumber: 2 },
    { id: "2024-02-W1", month: "February", weekNumber: 1 },
    { id: "2024-02-W2", month: "February", weekNumber: 2 },
  ],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
});

export default calendarSlice.reducer;
