import React from "react";
import "./Detail.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../main/Header";
import Kakao from "./Kakao";
import Footer from "../main/Footer";
import DetailCarousel from "./DetailCarousel";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch({
      type: "user/addProduct",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        text: item.text,
        imgsrc1: item.imgsrc1,
        imgsrc2: item.imgsrc2,
        categories: item.categories,
      },
    });
    navigate("/user/wishlist");
  };

  return (
    <>
      <div className="detail-container">
        <Header />
        <main className="detail-contentsBox">
          <div className="detail-contentsBox1">
            <div className="detail-productsitem1">
              {/* <div className="detail-imgBox">
                <img className="detail-imgBox" src={item.imgsrc1} alt="1" />
              </div> */}
              {item.imgsrc1 && <DetailCarousel item={item} />}
            </div>
            <div className="detail-productsitem2">
              <div>
                <p>제품명:{item.name}</p>
              </div>
              <div>
                <p>가격:{item.price}</p>
              </div>
              <div>
                <button className="detail-productsitem-btn1">채팅 하기</button>
              </div>
              <div>
                <button onClick={onClick} className="detail-productsitem-btn2">
                  찜
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/updateproduct/" + id);
                  }}
                  className="detail-productsitem-btn3"
                >
                  상품 수정
                </button>
              </div>
            </div>
          </div>

          <div className="detail-contentsBox2">
            <div className="detail-productsitem3">
              <div className="detail-productsitemtitle">
                <h2>상품 내용</h2>
                <div>{item.text}</div>
              </div>
            </div>

            <div className="detail-productsitem4">
              <div>
                <h2>새싹 정보</h2>
                <div>닉네임: {user[1].nickname}</div>
              </div>
              <div>
                <h2>닉네임 님의 다른 판매상품 정보</h2>
                <div className="detail-imgbox-grid">
                  {userproduct.slice(0, 3).map((up) => (
                    <div className="detail-itembox" key={up.id}>
                      <div
                        className="detail-imgbox1"
                        onClick={() => {
                          navigate("/detail/" + up.id);
                        }}
                      >
                        <img
                          className="detail-imgbox1"
                          src={up.imgsrc1}
                          alt=""
                        />
                      </div>
                      <span>{up.name}</span>
                      <br />
                      <span>{up.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-contentsBox3">
            <div className="detail-products">
              <h1>거래 희망 장소</h1>
              <div className="detail-productsmap">
                <Kakao />
              </div>
            </div>
          </div>

          <div className="detail-contentsBox4">
            <div className="detail-products4">
              <h1>이런 상품은 어때요?</h1>

              <div className="detail-divRecommend">
                {recommends ? (
                  recommends.slice(0, 4).map((e) => (
                    <div
                      className="detail-recommend"
                      key={e.id}
                      onClick={() => {
                        navigate("/detail/" + e.id);
                      }}
                    >
                      <div className="detail-recommend-img">
                        <img
                          className="detail-recommend-img"
                          src={e.imgsrc1}
                          alt=""
                        />
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
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
