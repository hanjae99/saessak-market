import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

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
