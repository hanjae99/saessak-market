import { configureStore, createSlice } from '@reduxjs/toolkit';
import adminData from './components/admin/adminSlice';
import productJSON from './product.json';
import boardJSON from './board.json';
import user from './userSlice';
import game from './gameSlice';
import score from './scoreSlice';
import blacklist from './blackListSlice';
import ntcData from './components/board/NtcSlice';
import objecttion from './components/admin/objecttionSlice';
import login from './loginSlice';
import comments from './commentSlice';

function getRandomDate(start, end) {
  const startDate = start.getTime();
  const endDate = end.getTime();
  return new Date(startDate + Math.random() * (endDate - startDate));
}

const userinitialState = [
  {
    id: 'admin',
    nickname: '관리자',
    pwd: '1111',
    name: '관리자',
    email: 'saessak@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
  {
    id: 'koo',
    nickname: '구상모',
    pwd: '1111',
    name: '구상모',
    email: 'koosangmo@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
  {
    id: 'jin',
    nickname: '김진',
    pwd: '1111',
    name: '김진',
    email: 'kimjin@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
  {
    id: 'kgs',
    nickname: '김궁서',
    pwd: '1111',
    name: '김궁서',
    email: 'kgs@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
  {
    id: 'lhj',
    nickname: '이한재',
    pwd: '1111',
    name: '이한재',
    email: 'lhj@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
  {
    id: 'psh',
    nickname: '박상현',
    pwd: '1111',
    name: '박상현',
    email: 'psh@gmail.com',
    phone: '01011112222',
    adress: '관악구',
    gender: 'male',
  },
];

let productId = 300000000;
const product = createSlice({
  name: 'product',
  initialState: productJSON
    .map((p) => ({
      ...p,
      imgsrc1: p.imgsrc1 === 'null' ? null : p.imgsrc1,
      imgsrc2: p.imgsrc2 === 'null' ? null : p.imgsrc2,
      imgsrc3: '',
      uptime: getRandomDate(new Date(2023, 7, 20), new Date()).toUTCString(),
      writer: userinitialState[Math.floor(Math.random() * 5) + 1].nickname,
    }))
    .sort((a, b) => (Date.parse(a.uptime) < Date.parse(b.uptime) ? 1 : -1)),
  // [{
  //   "id":"101694009",
  //   "name":"[미아아트] 아크릴 파도 무드등 20cm",
  //   "price":"32,000원",
  //   "text":"미사용 새상품 싸게팔아요 필요하신분사가세요 택배두가능해요 택배비는무료 안전결제 해놓으시면 편이점택배로 바로보내드릴게요",
  //   "imgsrc1":"https://img2.joongna.com/media/original/2023/03/19/1679212808120nmQ_N6F1V.jpg?impolicy=resizeWatermark3&ftext=cui1209",
  //   "imgsrc2":"https://img2.joongna.com/media/original/2023/03/19/16792128081208OP_1esMU.jpg?impolicy=resizeWatermark3&ftext=cui1209",
  //   "categories":"10,188"}]
  reducers: {
    add: (state, action) => {
      // payload: {name, categories [, text, price, imgsrc1, imgsrc2]}
      let tmp = {
        id: productId++ + '',
        name: action.payload.name,
        price: action.payload.price || '',
        text: action.payload.text || '',
        imgsrc1: action.payload.imgsrc1 || '',
        imgsrc2: action.payload.imgsrc2 || '',
        imgsrc3: action.payload.imgsrc3 || '',
        categories: action.payload.categories || '1',
        wantPlace: action.payload.wantPlace || '',
        uptime: new Date().toUTCString(),
      };
      state.unshift(tmp);
    },
    del: (state, action) => {
      // payload: id
      state.forEach((p, i) => (p.id === action.payload ? state.splice(i, 1) : ''));
    },
    fix: (state, action) => {
      console.log(action);
      // payload: {id, name [, price, text, imgsrc1, imgsrc2, categories]}
      let tmp = {
        id: action.payload.id,
        name: action.payload.name || '',
        price: action.payload.price || '',
        text: action.payload.text || '',
        imgsrc1: action.payload.imgsrc1 || '',
        imgsrc2: action.payload.imgsrc2 || '',
        imgsrc3: action.payload.imgsrc3 || '',
        categories: action.payload.categories || '1',
        wantPlace: action.payload.wantPlace || '',
      };
      // state = state.map((p) => (p.id === tmp.id ? { ...p, ...tmp } : p));
      state.forEach((p, i) => (p.id === tmp.id ? state.splice(i, 1, tmp) : ''));
    },
  },
});

let boardtId = 10000;
const board = createSlice({
  name: 'board',
  initialState: boardJSON
    .map((p) => ({
      ...p,
      date: getRandomDate(new Date(2023, 7, 10), new Date()).toUTCString(),
      id: boardtId++,
    }))
    .sort((a, b) => (Date.parse(a.date) < Date.parse(b.date) ? 1 : -1)),
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
        writer: action.payload.writer || '새싹방문자',
        clicked: 0,
        date: new Date().toUTCString(),
      };
      state.unshift(tmp);
    },
    del: (state, action) => {
      // payload: id
      // state = state.filter(p => p.id !== action.payload);
      state.forEach((p, i) => (p.id === action.payload / 1 ? state.splice(i, 1) : ''));
    },
    fix: (state, action) => {
      // payload: {id, title, content, }
      let tmp = {
        id: action.payload.id,
        title: action.payload.title,
        content: action.payload.content,
      };
      // state = state.map(p => p.id === tmp.id ? {...p, ...tmp} : p);
      state.forEach((p, i) => (p.id === tmp.id / 1 ? state.splice(i, 1, { ...p, ...tmp }) : ''));
    },
    clickedUp: (state, action) => {
      // payload: id
      // state = state.map(p=>p.id===action.payload ? {...p, clicked:p.clicked+1} : p);
      state.forEach((p, i) => (p.id === action.payload ? state.splice(i, 1, { ...p, clicked: p.clicked + 1 }) : ''));
    },
  },
});

const store = configureStore({
  reducer: {
    adminData: adminData.reducer,
    board: board.reducer,
    product: product.reducer,
    user: user.reducer,
    game: game.reducer,
    score: score.reducer,
    blacklist: blacklist.reducer,
    ntcData: ntcData.reducer,
    objecttion: objecttion.reducer,
    login: login.reducer,
    comments: comments.reducer,
  },
});

export default store;
