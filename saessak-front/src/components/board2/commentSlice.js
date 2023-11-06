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

        updateNow:0,
        
        list:[{id: "",
        pid: "",
        writerNickName: "",
        writerProfileImgUrl: "",
        content: "",
        upTime:""
      }]
    },
    reducers: {
      setData: (state, action) => {
        state.viewerRole = action.payload.viewerRole;
        state.userProfileImgUrl = action.payload.userProfileImgUrl;
        state.userNickName = action.payload.userNickName;
        state.list = action.payload.list;
        state.updateNow = action.payload.updateNow;
      }
    },
});

export default comments;