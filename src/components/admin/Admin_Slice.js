import { createSlice } from "@reduxjs/toolkit";


const adminData = createSlice({
  name: 'adminData',
  initialState: { 
    select_pitem : [],
    select_bitem : [],
    startDate : '2023-08-23',
    endDate : '2023-08-23',
    startTime : '02:05',
    endTime : '10:35'
   },
  reducers: {
    addSP : (state, action) => {
      state.select_pitem.indexOf(action.payload)>=0 ? console.log() : state.select_pitem.push(action.payload);
    },
    delSP : (state, action) => {
      state.select_pitem = state.select_pitem.filter(p => p!==action.payload);
    },
    delAllSP : (state) => {
      state.select_pitem = [];
    },
    addSB : (state, action) => {
      state.select_bitem.indexOf(action.payload)>=0 ? console.log() : state.select_bitem.push(action.payload);
    },
    delSB : (state, action) => {
      state.select_bitem = state.select_bitem.filter(p => p!==action.payload);
    },
    delAllSB : (state) => {
      state.select_bitem = [];
    },
    setSD : (state, action) => {
      state.startDate = action.payload;
    },
    setED : (state, action) => {
      state.endDate = action.payload;
    },
    setST : (state, action) => {
      state.startTime = action.payload;
    },
    setET : (state, action) => {
      state.endTime = action.payload;
    }
  }
});

export default adminData;