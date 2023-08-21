import React from "react";
import "./Game.css";

const Game = () => {
  return (
    <div className="container">
      <h1>HOW MUCH?? 중고가격 맞추기 게임</h1>
      <div className="contentsBox">
        <div className="imgBox">이미지</div>

        <div className="products">
          <div>
            <lable>제품명:asdasdasdasd</lable>
          </div>
          <div>
            <tetarea name="" id="" cols="30" rows="10">
              제품설명:ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
              ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㄴㅇㅁㄴㅇ
              ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㅁㄴㅇ
              ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
              ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
              ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㅁㄴㅇ
              ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇ
              ㅁㄴㅇㅁㄴㅇㅇㅁㄴㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
            </tetarea>
          </div>
        </div>
      </div>

      <div>
        <div className=""></div>
        <div>진행률 :1/10</div>
        <input
          type="number"
          placeholder="가격을 입력해주세요 (숫자만) ex)15000"
        />
        <button>입력</button>
      </div>
    </div>
  );
};

export default Game;
