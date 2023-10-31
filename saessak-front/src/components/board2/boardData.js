import { createSlice } from "@reduxjs/toolkit";

const boardData = createSlice({
  name: "boardData",
  initialState: {
    bData: "",
  },
  reducers: {
    setData: (state, action) => {
      state.bData = action.payload;
    }
  },
});



export default boardData;
