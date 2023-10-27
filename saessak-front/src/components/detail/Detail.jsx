import React, { useEffect, useState } from "react";
import "./Detail.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../main/Header";
import Kakao from "./Kakao";
import Footer from "../main/Footer";
import DetailCarousel from "./DetailCarousel";
import { call } from "../../ApiService";

const Detail = () => {
  const { id } = useParams();
  // const product = useSelector((state) => state.product);
  // const user = useSelector((state) => state.user);
  // const item = product.find((p) => p.id === id);
  const { kakao, daum } = window;
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
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

    // 지도 가져오기
    kakao.maps.load(() => {
      const container = document.getElementById("map_detail");
      const options = {
        // center: new kakao.maps.LatLng(33.450701, 126.570667),
        center: new kakao.maps.LatLng(37.489972, 126.927158),
        level: 3,
      };

      setMap(new kakao.maps.Map(container, options));
      setMarker(new kakao.maps.Marker());
    });
  }, [id]);

  // 상품에 판매하는 주소가 있는 경우
  if (detaildatas && detaildatas.mapData && map && marker) {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(detaildatas.mapData, function (results, status) {
      // 정상적으로 검색 완료
      if (status === kakao.maps.services.Status.OK) {
        const result = results[0];

        // 해당 주소에 대한 좌표를 받아
        const searchPos = new kakao.maps.LatLng(result.y, result.x);
        // 지도에 표시
        map.panTo(searchPos);
        marker.setMap(null);
        marker.setPosition(searchPos);
        marker.setMap(map);
      }
    });
  }

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
    // dispatch({
    //   type: "user/addProduct",
    //   payload: {
    //     id: item.id,
    //     name: item.name,
    //     price: item.price,
    //     text: item.text,
    //     imgsrc1: item.imgsrc1,
    //     imgsrc2: item.imgsrc2,
    //     categories: item.categories,
    //   },
    // });
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
              {detaildatas.imagesUrl && (
                <DetailCarousel detaildatas={detaildatas.imagesUrl} />
              )}
            </div>
            <div className="detail-productsitem2">
              <div>
                <h1>제품명</h1>
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
                  {detaildatas.price}
                </p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/chatting")}
                  className="detail-productsitem-btn1"
                >
                  채팅 하기
                </button>
              </div>
              <div>
                <button onClick={onClick} className="detail-productsitem-btn2">
                  찜
                </button>
              </div>
              <div>
                {detaildatas.isWriter && (
                  <button
                    onClick={() => {
                      navigate("/updateproduct/" + id);
                    }}
                    className="detail-productsitem-btn3"
                  >
                    상품 수정
                  </button>
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
                          <span>{up.price}원</span>
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
                <div id="map_detail"></div>
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
                        <span>{cp.price}원</span>
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
