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
      id: "jin",
      nickname: "김진",
      pwd: "1111",
      name: "김진",
      email: "kimjin@gmail.com",
      phone: "01011112222",
      adress: "관악구",
      gender: "male",
    },
  ],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
      //action.payload에는 모든 initialState의 모든정보가 있어야한다.
    },
    delete: (state, action) => {
      //payload: id
      state = state.filter((e) => action.payload !== e.id);
    },
    update: (state, action) => {
      let newstate = {
        //payload: {name, nickname, pwd,email,phone,adress}
        name: action.payload.name,
        nickname: action.payload.nickname,
        pwd: action.payload.pwd,
        email: action.payload.email,
        phone: action.payload.phone,
        adress: action.payload.adress,
      };
      state = state.map((p) =>
        p.id === newstate.id ? { ...p, ...newstate } : p
      );
    },
  },
});

export default user;
