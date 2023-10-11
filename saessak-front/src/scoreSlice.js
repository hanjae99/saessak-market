import { createSlice } from "@reduxjs/toolkit";

const finalResult = 0;

const score = createSlice({
  name: "score",
  initialState: { no: finalResult },
  reducers: {
    resultadd: (state, action) => {
      // console.log("scoreslice ====" + state.no);
      state.no += action.payload;
    },
  },
});

export default score;
