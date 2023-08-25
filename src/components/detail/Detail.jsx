import React from "react";
import "./Detail.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { parse } from "qs";
import Header from "../main/Header";

const Detail = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const item = product.find((p) => p.id === id);
  const userproduct = useSelector((state) => state.user[1].userproduct);
  const recommends = product.filter((i) => {
    // console.log("item", item);
    // console.log(i);
    return (
      i.categories.split(",").find((p) => parseInt(p) < 20) ===
      item.categories.split(",").find((p) => parseInt(p) < 20)
    );
  });

  const navigate = useNavigate();

  return (
    <div className="detail-container">
      <Header />
      <main className="detail-contentsBox">
        <div className="detail-contentsBox2">
          <div className="detail-products">
            <div className="detail-imgBox">
              <img className="detail-imgBox" src={item.imgsrc1} alt="1" />
            </div>
          </div>
          <div className="detail-products">
            <div>
              <p>제품명:{item.name}</p>
            </div>
            <div>
              <p>가격:{item.price}</p>
            </div>
            <div>
              <button>채팅 하기</button>
            </div>
            <div>
              <button>찜</button>
            </div>
          </div>
        </div>

        <div className="detail-contentsBox2">
          <div className="detail-products">
            <div>
              <h2>상품 내용</h2>
              <div>{item.text}</div>
            </div>
          </div>

          <div className="detail-products">
            <div>
              <h2>새싹 정보</h2>
              <div>닉네임: {user[1].nickname}</div>
            </div>
            <div>
              <h2>닉네임 님의 다른 판매상품 정보</h2>
              <div className="detail-imgbox-flex">
                {userproduct.slice(0, 3).map((up) => (
                  <div className="detail-itembox" key={up.id}>
                    <div className="detail-imgbox1">
                      <img className="detail-imgbox1" src={up.imgsrc1} alt="" />
                    </div>
                    <p>상품명:{up.name}</p>
                    <h5>가격:{up.price}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="detail-contentsBox3">
          <div className="detail-products">
            <h1>거래 희망 장소</h1>
            지도이미지 큰거
          </div>
        </div>

        <div className="detail-contentsBox4">
          <div className="detail-products4">
            <h1>이런 상품은 어때요?</h1>

            {recommends ? (
              recommends.slice(0, 4).map((e) => (
                <div key={e.id}>
                  <div>
                    <img src={e.imgsrc1} alt="" />
                  </div>
                  <p>제품명:{e.name}</p>
                  <p>제품가격:{e.price}</p>
                </div>
              ))
            ) : (
              <p>상품이 없어요 ㅠㅠ</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
