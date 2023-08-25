import { createSlice } from "@reduxjs/toolkit";

const login = createSlice({
  name: "login",
  initialState: {
    id: ''
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload;
    },
    logout: (state, action) => {
      state.id = '';
    }
  },
});




export default login;
