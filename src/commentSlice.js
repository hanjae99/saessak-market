import { createSlice } from "@reduxjs/toolkit";


const comments = createSlice({
  name: 'comments',
  initialState: [
    {
      commentId: '10000',
      upTime: "2023.08.21 05:39",
      fixTime: "2023.08.21 05:39",
      parent: 'objection',
      parentId: '100000',
      parentCommentId:'1234',
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

export default comments;