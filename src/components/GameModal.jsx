import React from "react";
import { useDispatch, useSelector } from "react-redux";

const GameModal = () => {
  const game = useSelector((state) => state.game);
  // const dispatch = useDispatch();
  console.log(game);
  return (
    <div>
      <div>이미지</div>
      <label>입력하신 가격 :</label>
      <p>원</p>
      <label>중고 가격 :</label>
      <p>{game[0].price}</p>
      <h1>점수 : 9 점</h1>
    </div>
  );
};

export default GameModal;
