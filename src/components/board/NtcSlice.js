import { createSlice } from '@reduxjs/toolkit';
import ntcbd from './Ntc.json';

function getRandomDate(start, end) {
  const startDate = start.getTime();
  const endDate = end.getTime();
  return new Date(startDate + Math.random() * (endDate - startDate));
}

let boardtId = 10000;
const ntcData = createSlice({
  name: 'ntcData',
  initialState: ntcbd
    .map((p) => ({
      ...p,
      date: getRandomDate(new Date(2023, 7, 10), new Date()).toUTCString(),
      clicked: Math.floor(Math.random()*50+1)
    }))
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? 1 : -1)).map(p=>({...p, id: boardtId++,})).sort((a, b) => (Date.parse(a.date) < Date.parse(b.date) ? 1 : -1)),
  // [
  //   {
  //     "title": "술안주",
  //     "writer": "Goldenstar",
  //     "date": "2023.08.21 05:39",
  //     "clicked": "15",
  //     "content": "<img src='https://img2.quasarzone.com/editor/2023/08/21/6b1b1dcf9d2ab27a53eb89d747aaabdd.jpg' alt='퀘이사존'><span><br><br><img src='https://img2.quasarzone.com/editor/2023/08/21/fc8803fd75ab2dd3a3b008f0134e2327.jpg' alt='퀘이사존'></span><br>"
  //   }
  // ]
  reducers: {
    add: (state, action) => {
      // payload: {title, writer, content}
      let tmp = {
        id: boardtId++,
        title: action.payload.title,
        content: action.payload.content,
        writer: action.payload.writer,
        clicked: 0,
        date: new Date().toUTCString(),
      };
      state.unshift(tmp);
    },
    del: (state, action) => {
      // payload: id
      // state = state.filter(p => p.id !== action.payload);
      state.forEach((p, i) => (p.id === action.payload ? state.splice(i, 1) : ''));
    },
    fix: (state, action) => {
      // payload: {id, title, content, }
      let tmp = {
        title: action.payload.title,
        content: action.payload.content,
      };
      // state = state.map(p => p.id === tmp.id ? {...p, ...tmp} : p);
      state.forEach((p, i) => (p.id === tmp.id ? state.splice(i, 1, tmp) : ''));
    },
    clickedUp: (state, action) => {
      // payload: id
      // state = state.map(p=>p.id===action.payload ? {...p, clicked:p.clicked+1} : p);
      state.forEach((p, i) => (p.id === action.payload ? state.splice(i, 1, { ...p, clicked: p.clicked + 1 }) : ''));
    },
  },
});

export default ntcData;
