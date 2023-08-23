import { createSlice } from "@reduxjs/toolkit";


const adminData = createSlice({
  name: 'blacklist',
  initialState: { 
    hiddenPdata:[],
    hiddenBdata:[],
    blackUser:[]
   },
  reducers: {
    addHPD : (state, action) => { // payload: {data, dispatch}
      state.hiddenPdata.push(action.payload.data);
      action.payload.dispatch({type:'product/del',payload:action.payload.data.id})
    },
    delHPD : (state, action) => { // payload: {data, dispatch}
      state.hiddenPdata = state.hiddenPdata.map(p=>p.id!==action.payload.data.id);
      action.payload.dispatch({type:'product/add', payload:action.payload.data})
    },
    addHBD : (state, action) => { // payload: {data, dispatch}
      state.hiddenBdata.push(action.payload.data);
      action.payload.dispatch({type:'board/del',payload:action.payload.data.id})
    },
    delHBD : (state, action) => { // payload: {data, dispatch}
      state.hiddenBdata = state.hiddenBdata.map(p=>p.id!==action.payload.data.id);
      action.payload.dispatch({type:'board/add', payload:action.payload.data})
    },
    addBLU : (state, action) => {
      state.blackUser.push(action.payload);
    },
    delBLU : (state, action) => {
      state.blackUser = state.blackUser.map(p=>p!==action.payload);
    }
  }
});

export default adminData;