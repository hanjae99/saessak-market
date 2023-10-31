import { createSlice } from "@reduxjs/toolkit";

// {viewerRole:'any', userProfileImgUrl:'', userNickName:''}
// .id(p.getId())
//           .pid(p.getComment().getId())
//           .content(p.getContent())
//           .writerNickName(writerNickName)
//           .writerProfileImgUrl(writerProfileImgUrl)



const comments = createSlice({
  name: 'comments',
  initialState: 
    {
        viewerRole:'any',
        userProfileImgUrl:'', 
        userNickName:'',
        
        list:[{id: "",
        pid: "",
        writerNickName: "",
        writerProfileImgUrl: "",
        content: ""}]
    },
    reducers: {
      setData: (state, action) => {
        state.viewerRole = action.payload.viewerRole;
        state.userProfileImgUrl = action.payload.userProfileImgUrl;
        state.userNickName = action.payload.userNickName;
        state.list = action.payload.list;
      }
    },
});

export default comments;