import { createSlice } from "@reduxjs/toolkit";
// import productJSON from "./product.json";
// import { call } from "./ApiService";

// const originalData = productJSON;

// function getRandomItemsFromArray(array, numberOfItems) {
//   const result = [];
//   const availableIndexes = Array.from(
//     { length: array.length },
//     (_, index) => index
//   );

//   for (let i = 0; i < numberOfItems; i++) {
//     const randomIndex = Math.floor(Math.random() * availableIndexes.length);
//     const selectedIndex = availableIndexes[randomIndex];

//     result.push(array[selectedIndex]);
//     availableIndexes.splice(randomIndex, 1);
//   }

//   return result;
// } //JSON파일 랜덤으로 10뽑아주는 함수

// // console.log(randomData); // 랜덤하게 뽑힌 10개의 데이터
// const randomData = getRandomItemsFromArray(originalData, 10);

const initialState = {
  data: {},
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameData: (state, action) => {
      console.log("나 액션이야", action.payload);
      console.log("나는 스테이트야", state.data);
      // state.data = action.payload;
      return { ...state, data: action.payload };
    },
  },
});

export default game;
export const { setGameData } = game.actions;
