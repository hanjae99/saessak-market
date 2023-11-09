import React, { createElement, useEffect, useState } from "react";
import "./Detail.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../main/Header";
import Footer from "../main/Footer";
import DetailCarousel from "./DetailCarousel";
import { call } from "../../ApiService";
import KakaoMap from "./KakaoMap";
import { chatCall } from "../../ChatService";
import priceComma from "./../../pricecomma";

const Detail = () => {
  const { id } = useParams();
  // const product = useSelector((state) => state.product);
  // const user = useSelector((state) => state.user);
  // const item = product.find((p) => p.id === id);
  const [detaildatas, setDetaildatas] = useState({
    productId: 0,
    memberDTO: {
      nickName: "",
      productDTOList: [],
      memberId: 0,
    },
    title: "",
    content: "",
    imagesUrl: [],
    isWriter: null,
    price: 0,
    clickCount: 0,
    sellStatus: "",
    mapData: "",
    categoryProductDTO: [],
  });

  useEffect(() => {
    call(`/detail/${id}`, "GET").then((response) => {
      console.log(response);
      if (response === 1) {
        navigate("/");
      }

      setDetaildatas(response);
    });

    // 조회수 증가
    call(`/product/clickPlus/${id}`, "PUT").then((response) => {
      // console.log(response);
    });
  }, [id]);

  // console.log(detaildatas);
  // console.log(detaildatas.productId);
  // console.log(detaildatas.memberDTO.productDTOList);

  // const userproduct = useSelector((state) => state.user[1].userproduct);
  // const recommends = product.filter((i) => {
  //   // console.log("item", item);
  //   // console.log(i);
  //   return (
  //     i.categories.split(",").find((p) => parseInt(p) < 20) ===
  //     item.categories.split(",").find((p) => parseInt(p) < 20)
  //   );
  // });

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    if (accessToken === "") {
      alert("로그인 후 이용해주세요");
      navigate("/login");
      return;
    }

    call(`/detail/addwish/${id}`, "POST", null).then((response) => {
      // console.log(response);
      navigate("/user/wishlist");
      if (response.error === "success") {
        alert("찜 목록에 추가되었습니다.");
      }
    });
  };

  const handleChat = () => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 토큰 유효시간 검사
      const expiration = localStorage.getItem("EXPIREDATE");
      if (expiration && expiration !== "") {
        const now = new Date().getTime();
        // 토큰 만료
        if (now >= Date.parse(expiration)) {
          localStorage.setItem("ACCESS_TOKEN", "");
          localStorage.setItem("EXPIREDATE", "");
          localStorage.setItem("USERID", "");
          alert("로그인 시간이 만료되었습니다");
          navigate("/login");
          return;
        }
      }
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
      return;
    }

    const request = {
      productId: id,
      writer: detaildatas.memberDTO.memberId,
    };

    chatCall("/chatBox/getChatBox", "POST", request).then((response) => {
      if (response) {
        window.open(`/chat/${response}`, "새싹마켓", "width=600,height=840");
      }
    });
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
              {detaildatas && detaildatas.imagesUrl ? (
                <DetailCarousel detaildatas={detaildatas.imagesUrl} />
              ) : (
                ""
              )}
            </div>
            <div className="detail-productsitem2">
              <div className="detail-productsTitleAndSellStatus">
                <h1>제품명</h1>
                {detaildatas.sellStatus === "SELL" ? (
                  <p className="selling-status selling">판매중</p>
                ) : (
                  ""
                )}
                {detaildatas.sellStatus === "SOLD_OUT" ? (
                  <p className="selling-status sold-out">판매완료</p>
                ) : (
                  ""
                )}
              </div>
              <div className="detail-productsitem-divname">
                <p className="detail-productsitem-div-name">
                  {detaildatas.title}
                </p>
              </div>
              <div>
                <h1>가격</h1>
              </div>
              <div className="detail-productsitem-divprice">
                <p className="detail-productsitem-div-price">
                  {priceComma(detaildatas.price)}
                  <span>원</span>
                </p>
              </div>
              <div>
                {detaildatas.isWriter && detaildatas.isWriter === "false" ? (
                  <button
                    onClick={handleChat}
                    className="detail-productsitem-btn1"
                  >
                    채팅 하기
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                <button onClick={onClick} className="detail-productsitem-btn2">
                  찜
                </button>
              </div>
              <div>
                {detaildatas.isWriter && detaildatas.isWriter === "true" ? (
                  <button
                    onClick={() => {
                      navigate("/updateproduct/" + id);
                    }}
                    className="detail-productsitem-btn3"
                  >
                    상품 수정
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <div className="detail-contentsBox2">
            <div className="detail-productsitem3">
              <div className="detail-productsitemtitle">
                <h2>상품 내용</h2>
                <div>{detaildatas.content}</div>
              </div>
            </div>

            <div className="detail-productsitem4">
              <div>
                <h2>새싹 정보</h2>
                <div>
                  닉네임:{" "}
                  {detaildatas &&
                    detaildatas.memberDTO &&
                    detaildatas.memberDTO.nickName}
                </div>
              </div>
              <div>
                <h2>
                  {detaildatas &&
                    detaildatas.memberDTO &&
                    detaildatas.memberDTO.nickName}{" "}
                  님의 다른 판매상품 정보
                </h2>
                <div className="detail-imgbox-grid">
                  {detaildatas &&
                    detaildatas.memberDTO &&
                    detaildatas.memberDTO.productDTOList
                      .filter((dto) => dto.productId !== id)
                      .slice(0, 3)
                      .map((up) => (
                        <div className="detail-itembox" key={up.productId}>
                          <div
                            className="detail-imgbox1"
                            onClick={() => {
                              navigate(`/detail/${up.productId}`);
                            }}
                          >
                            <img
                              className="detail-imgbox1"
                              src={`http://localhost:8888${up.imgUrl}`}
                              alt=""
                            />
                          </div>
                          <div className="detail-textobx">
                            <span>{up.title}</span>
                          </div>
                          <br />
                          <span>{priceComma(up.price)}원</span>
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
                {detaildatas.mapData !== "" ? (
                  <KakaoMap mapData={detaildatas.mapData} />
                ) : (
                  <div>등록된 판매장소가 없어요 ㅠㅠ</div>
                )}
              </div>
            </div>
          </div>

          <div className="detail-contentsBox4">
            <div className="detail-products4">
              <h1>이런 상품은 어때요?</h1>

              <div className="detail-divRecommend">
                {detaildatas.categoryProductDTO ? (
                  detaildatas.categoryProductDTO.map((cp) => (
                    <div
                      className="detail-recommend"
                      key={cp.productId}
                      onClick={() => {
                        navigate(`/detail/${cp.productId}`);
                      }}
                    >
                      <div className="detail-recommend-img">
                        <img
                          className="detail-recommend-img"
                          src={`http://localhost:8888${cp.imgUrl}`}
                          alt=""
                        />
                      </div>
                      <div className="detail-recommend-name">
                        <span>{cp.title}</span>
                      </div>
                      <div>
                        <span>{priceComma(cp.price)}원</span>
                      </div>
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
