import { createSlice } from "@reduxjs/toolkit";
import productJSON from "./product.json";

const originalData = productJSON;

function getRandomItemsFromArray(array, numberOfItems) {
  const result = [];
  const availableIndexes = Array.from(
    { length: array.length },
    (_, index) => index
  );

  for (let i = 0; i < numberOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const selectedIndex = availableIndexes[randomIndex];

    result.push(array[selectedIndex]);
    availableIndexes.splice(randomIndex, 1);
  }

  return result;
}

const randomData = getRandomItemsFromArray(originalData, 10);
console.log(randomData); // 랜덤하게 뽑힌 10개의 데이터

const game = createSlice({
  name: "game",
  initialState: randomData,
  reducers: {},
});

export default game;
