import React from "react";
import "./Detail.css";

const Detail = () => {
  return (
    <div className="container">
      <div className="contentsBox">
        <div className="contentsBox2">
          <div className="products">
            <div className="imgBox">이미지</div>
          </div>
          <div className="products">
            <div>
              <lable>제품명:asdasdasdasd</lable>
            </div>
            <div>
              <lable>가격:999,999</lable>
            </div>
            <div>
              <button>채팅 하기</button>
            </div>
            <div>
              <button>찜</button>
            </div>
          </div>
        </div>

        <div className="contentsBox2">
          <div className="products">
            <div>
              <h2>상품 내용</h2>
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

          <div className="products">
            <div>
              <h2>새싹 정보</h2>
              <div>닉네임: 판매자 닉네임</div>
            </div>
            <div>
              <h2>닉네임 님의 다른 판매상품 정보</h2>
              <div></div>
            </div>
          </div>
        </div>

        <div className="contentsBox2">
          <div className="products">
            <h1>거래 희망 장소</h1>
            지도이미지 큰거
          </div>
        </div>

        <div className="contentsBox2">
          <div className="products">
            <h1>이런 상품은 어때요?</h1>
            <div>이미지</div>
            <p>제품이름</p>
            <p>제품비번</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
