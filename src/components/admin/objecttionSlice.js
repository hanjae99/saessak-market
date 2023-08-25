import { createSlice } from "@reduxjs/toolkit";

let commentId = 10000;
const objecttion = createSlice({
  name: 'objecttion',
  initialState: [
    {
      commentId: commentId++ +'',
      upTime: "2023.08.21 05:39",
      fixTime: "2023.08.21 05:39",
      title: '제가 왜 정지당한거죠???',
      writer: 'psh',
      content : '풀어줘요!!'
    },
  ],
  reducers: {
    addSP: (state, action) => {
      state.select_pitem.indexOf(action.payload) >= 0 ? console.log() : state.select_pitem.push(action.payload);
    }
  }
});

export default objecttion;