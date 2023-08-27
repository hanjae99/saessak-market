import React from "react";
import { useDispatch, useSelector } from "react-redux";

const GameModal = ({ setModalOpen, result, inputprice, onIncrease, index }) => {
  const game = useSelector((state) => state.game);

  const onClick = () => {
    setModalOpen(false);
    onIncrease();
  };
  // const dispatch = useDispatch();
  // console.log(game);

  function comma(no) {
    no += "";
    let commaNo = Math.floor((no.length - 1) / 3);
    for (let i = 0; i < commaNo; i++) {
      no =
        no.substring(0, no.length - 3 - 4 * i) +
        "," +
        no.substring(no.length - 3 - 4 * i);
    }
    return no;
  }

  return (
    <div className="modal-container">
      <div>
        <img
          src={game && game[index].imgsrc1}
          alt="이미지"
          className="modal-imgBox"
        />
      </div>

      <div className="modal-labelbox">
        <label className="modal-label">입력하신 가격</label>
        <div className="modal-p">{comma(inputprice)}원</div>
      </div>

      <div className="modal-labelbox">
        <label className="modal-label">중고 가격 </label>
        <div className="modal-p">{game[index].price}</div>
      </div>
      <h1>점수 : {result} 점</h1>
      <button className="modal-btn" onClick={onClick}>
        다음문제
      </button>
    </div>
  );
};

export default GameModal;
