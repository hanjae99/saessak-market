import { createSlice } from "@reduxjs/toolkit";

let commentId = 10000;
const comments = createSlice({
  name: 'comments',
  initialState: [
    {
      commentId: '9999',
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
    add: (state, action) => {
      let tmp = {
        commentId: commentId++ + '',
        upTime: new Date().toUTCString(),
        fixTime: "",
        parent: "",
        parentId: "",
        parentCommentId:"",
        writer: "",
        content : ""
      }
      state.push(({...tmp, ...action.payload}))
    }
  }
});

export default comments;