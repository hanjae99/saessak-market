import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
  name: "login",
  initialState: {
    url: "/",
  },
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    }
  },
});



export default login;
