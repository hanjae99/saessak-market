import React from "react";
import "./GameResult.css";

const GameResult = () => {
  return (
    <div>
      <h3> 당신의 점수는 ?!</h3>
      <h1>95점</h1>
      <h3>물가 전문가!</h3>
      <p>지금 보신 상품은 어떠신가요?</p>
      <div className="imgBoxs">
        <div className="products">
          <div className="imgBox1"></div>
          <p>상품명:</p>
        </div>
      </div>
    </div>
  );
};

export default GameResult;
