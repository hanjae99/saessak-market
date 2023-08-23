import React from "react";
import { useDispatch, useSelector } from "react-redux";

const GameModal = ({ setModalOpen, result, inputprice, onIncrease, index }) => {
  const game = useSelector((state) => state.game);

  const onClick = () => {
    setModalOpen(false);
    onIncrease();
  };
  // const dispatch = useDispatch();
  console.log(game);
  return (
    <div className="container">
      <div>
        <img
          src={game && game[index].imgsrc1}
          alt="이미지"
          className="imgBox"
        />
      </div>
      <label>입력하신 가격 :</label>
      <p>{inputprice}원</p>
      <label>중고 가격 :</label>
      <p>{game[index].price}</p>
      <h1>점수 : {result} 점</h1>
      <button onClick={onClick}>다음문제</button>
    </div>
  );
};

export default GameModal;
