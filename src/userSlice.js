import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: [
    {
      id: "admin",
      nickname: "관리자",
      pwd: "1111",
      name: "관리자",
      email: "saessak@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
    {
      id: "koo",
      nickname: "구상모",
      pwd: "1111",
      name: "구상모",
      email: "koosangmo@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
    {
      id: "jin",
      nickname: "김진",
      pwd: "1111",
      name: "김진",
      email: "kimjin@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
    {
      id: "kgs",
      nickname: "김궁서",
      pwd: "1111",
      name: "김궁서",
      email: "kgs@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
    {
      id: "lhj",
      nickname: "이한재",
      pwd: "1111",
      name: "이한재",
      email: "lhj@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
    {
      id: "psh",
      nickname: "박상현",
      pwd: "1111",
      name: "박상현",
      email: "psh@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
  ],
  reducers: {
    //* payload : {id, nickname, pwd, name, email, phone, adress, gender} */
    add: (state, action) => { 
      state.push(action.payload);
    },
    // payload : id
    delete: (state, action) => { 
      state.forEach((p,i) => p.id === action.payload ? state.splice(i,1) : '');
    },
    // payload : {id, nickname, pwd, name, email, phone, adress, gender}
    update: (state, action) => {  
      state.forEach((p,i) => p.id === action.payload.id ? state[i]=action.payload : '')
    },
  },
});

export default user;
