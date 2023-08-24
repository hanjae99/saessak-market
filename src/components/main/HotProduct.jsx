import React from "react";
import { useNavigate } from "react-router-dom";

const HotProduct = () => {
  const navigate = useNavigate();

  return (
    <div id="hotItemContainer">
      <div
        className="hotItem1"
        onClick={() => {
          navigate("/search/노트북");
        }}
      >
        #노트북
      </div>
      <div
        className="hotItem2"
        onClick={() => {
          navigate("/search/버즈");
        }}
      >
        #버즈
      </div>
      <div
        className="hotItem3"
        onClick={() => {
          navigate("/search/컴퓨터");
        }}
      >
        #컴퓨터
      </div>
      <div
        className="hotItem4"
        onClick={() => {
          navigate("/search/닌텐도");
        }}
      >
        #닌텐도
      </div>
      <div
        className="hotItem5"
        onClick={() => {
          navigate("/search/아이폰");
        }}
      >
        #아이폰
      </div>
      <div
        className="hotItem6"
        onClick={() => {
          navigate("/search/샤넬");
        }}
      >
        #샤넬
      </div>
      <div
        className="hotItem7"
        onClick={() => {
          navigate("/search/아이패드");
        }}
      >
        #아이패드
      </div>
      <div
        className="hotItem8"
        onClick={() => {
          navigate("/search/컨버스");
        }}
      >
        #컨버스
      </div>
    </div>
  );
};

export default HotProduct;
