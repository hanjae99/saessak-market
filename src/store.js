import { configureStore, createSlice } from "@reduxjs/toolkit";
import adminData from "./components/admin/Admin_Slice";
import productJSON from "./product.json";
import boardJSON from "./board.json";

function getRandomDate(start, end) {
  const startDate = start.getTime();
  const endDate = end.getTime();
  return new Date(startDate + Math.random() * (endDate - startDate));
}

let productId = 300000000;
const product = createSlice({
  name: 'product',
  initialState: productJSON.map(p=>({...p,imgsrc1:p.imgsrc1==='null'?null:p.imgsrc1,imgsrc2:p.imgsrc2==='null'?null:p.imgsrc2 , uptime: getRandomDate(new Date(2023, 7, 10), new Date()).toUTCString()})),
  // [{
  //   "id":"101694009",
  //   "name":"[미아아트] 아크릴 파도 무드등 20cm",
  //   "price":"32,000원",
  //   "text":"미사용 새상품 싸게팔아요 필요하신분사가세요 택배두가능해요 택배비는무료 안전결제 해놓으시면 편이점택배로 바로보내드릴게요",
  //   "imgsrc1":"https://img2.joongna.com/media/original/2023/03/19/1679212808120nmQ_N6F1V.jpg?impolicy=resizeWatermark3&ftext=cui1209",
  //   "imgsrc2":"https://img2.joongna.com/media/original/2023/03/19/16792128081208OP_1esMU.jpg?impolicy=resizeWatermark3&ftext=cui1209",
  //   "categories":"10,188"}]
  reducers: {
    add: (state, action) => { // payload: {name, categories [, text, price, imgsrc1, imgsrc2]}
      let tmp = {
        id: productId++,
        name: action.payload.name,
        price: action.payload.price || "",
        text: action.payload.text || "",
        imgsrc1: action.payload.imgsrc1 || "",
        imgsrc2: action.payload.imgsrc2 || "",
        categories: action.payload.categories,
        uptime: new Date().toUTCString()
      };
      state.push(tmp);
    },
    del: (state, action) => { // payload: id
      state = state.filter(p => p.id !== action.payload);
    },
    fix: (state, action) => { // payload: {id, name [, price, text, imgsrc1, imgsrc2, categories]}
      let tmp = {
        id: action.payload.id,
        name: action.payload.name || "",
        price: action.payload.price || "",
        text: action.payload.text || "",
        imgsrc1: action.payload.imgsrc1 || "",
        imgsrc2: action.payload.imgsrc2 || "",
        categories: action.payload.categories || ""
      };
      state = state.map(p => p.id === tmp.id ? {...p, ...tmp} : p);
    }
  }
});

let boardtId = 10000;
const board = createSlice({
  name: 'board',
  initialState: boardJSON.map(p=>({...p, date: getRandomDate(new Date(2023, 7, 10), new Date()).toUTCString(), id:boardtId++})),
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
    add: (state, action) => { // payload: {title, writer, content}
      let tmp = {
        id: boardtId++,
        title: action.payload.title,
        content: action.payload.content,
        writer: action.payload.writer,
        clicked: 0,
        date: new Date().toUTCString()
      };
      state.push(tmp);
    },
    del: (state, action) => { // payload: id
      state = state.filter(p => p.id !== action.payload);
    },
    fix: (state, action) => { // payload: {id, title, content, }
      let tmp = {
        title: action.payload.title,
        content: action.payload.content,
      };
      state = state.map(p => p.id === tmp.id ? {...p, ...tmp} : p);
    },
    clickedUp: (state, action) => { // payload: id
      state.map(p=>p.id===action.payload ? {...p, clicked:p.clicked+1} : p);
    }
  }
});

const store = configureStore({
  reducer: {
    adminData: adminData.reducer,
    board: board.reducer,
    product: product.reducer
  }
})

export default store