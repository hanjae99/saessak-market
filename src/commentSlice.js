import { createSlice } from "@reduxjs/toolkit";



let commentId = 10003;
const comments = createSlice({
  name: 'comments',
  initialState: [
    {
        "commentId": "10000",
        "upTime": "Sat, 26 Aug 2023 14:33:06 GMT",
        "fixTime": "",
        "parent": "objecttion",
        "parentId": "10000",
        "parentCommentId": "",
        "writer": "admin",
        "content": "박상현님 안녕하세요.\n새싹마켓 입니다.\n\n고객님은 회 사진으로 자랑을 하여 차단된 것으로 확인이 됩니다.\n해당 사안은 차단해제가 불가능함을 알려드립니다.\n감사합니다."
    },
    {
        "commentId": "10001",
        "upTime": "Sat, 26 Aug 2023 14:37:43 GMT",
        "fixTime": "",
        "parent": "objecttion",
        "parentId": "10000",
        "parentCommentId": "",
        "writer": "admin",
        "content": "ㅋㅋ"
    },
    {
        "commentId": "10002",
        "upTime": "Sat, 26 Aug 2023 14:37:44 GMT",
        "fixTime": "",
        "parent": "objecttion",
        "parentId": "10000",
        "parentCommentId": "",
        "writer": "admin",
        "content": "ㅋㅋㅋㅎㅎ"
    }
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