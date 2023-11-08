import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { call } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";
import priceComma from "../../pricecomma";

const WishList = () => {
  const movePages = useNavigate();
  const [wish, setWish] = useState([]);

  useEffect(() => {
    call("/user/wishlist", "GET").then((response) => {
      setWish(response.data);
      console.log(response);
    });
  }, []);

  console.log(wish);

  // 페이징 처리(한 페이지당 30개의 상품 노출)
  const [pageBtns, setPageBtns] = useState([]); // 페이지 버튼들을 저장하는 상태 변수
  const [pageNumLength, setpageNumLength] = useState(0);

  // 페이지 이동 처리 함수
  const movePage = useCallback((i) => {
    setpageNumLength(i - 1); // 선택된 페이지로 pageNumLength 설정
    window.scrollTo(0, 0); // 페이지 이동 후 맨 위로 스크롤
  }, []);

  useEffect(() => {
    // 총 페이지 수 계산

    const makePageBtn = () => {
      const totalPage = Math.ceil(wish.length / 2);

      const newPageBtns = [];
      // 페이지 버튼 6개씩 보여주기
      for (
        let i = 1 + 5 * pageNumLength;
        i <= 1 + 5 * (pageNumLength + 1);
        i++
      ) {
        if (i > totalPage) {
          break;
        }
        const pageBtn = (
          <button onClick={() => movePage(i)} key={i}>
            {i}
          </button>
        );
        newPageBtns.push(pageBtn);
      }
      setPageBtns(newPageBtns); // 페이지 버튼 상태 업데이트
    };
    makePageBtn(); // 페이지 버튼 생성 함수 호출
  }, [wish, movePage]);

  console.log(pageNumLength);
  console.log("안녕", pageBtns);

  // page 버튼 6개씩 보여주기
  const prevPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength - 1); // 이전 페이지 세트로 이동
  }, [pageNumLength]);

  const nextPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength + 1); // 다음 페이지 세트로 이동
  }, [pageNumLength]);

  const itemsPerPage = 2; // 페이지당 상품 수
  const [displayedProducts, setDisplayedProduct] = useState([]);

  useEffect(() => {
    const displayedProduct =
      wish &&
      wish.slice(
        pageNumLength * itemsPerPage,
        Math.min((pageNumLength + 1) * itemsPerPage, wish.length)
      );
    setDisplayedProduct(displayedProduct);
  }, [wish, pageNumLength, movePage]);
  console.log(displayedProducts);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            {displayedProducts &&
              displayedProducts.map((a, i) => (
                <div key={i}>
                  <div className="table-main">
                    <div className="table-body">
                      <div className="table-day">
                        {(() => {
                          const date = new Date(
                            displayedProducts[i].updateTime
                          );
                          const year = date.getFullYear();
                          const month = (1 + date.getMonth())
                            .toString()
                            .padStart(2, "0");
                          const day = date
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          return `${year}-${month}-${day}`;
                        })()}
                      </div>
                    </div>
                    <div className="td-main">
                      <div className="td-1">
                        <div className="td-1-1">
                          <div className="td-1-1-1">
                            <span className="td-1-1-1-1">
                              {displayedProducts[i].sellStatus}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-1">
                            <div className="text-1-1">
                              <div className="text-2">
                                <div
                                  className="text-2-1"
                                  onClick={() =>
                                    movePages(
                                      "/detail/" +
                                        displayedProducts[i].productId
                                    )
                                  }
                                >
                                  <div className="text-2-img">
                                    <img
                                      className="img1"
                                      src={`${API_BASE_URL}${displayedProducts[i].imgUrl}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-2-name">
                                    <div className="text-2-name-1">
                                      <div className="text-2-name-1-1">
                                        {displayedProducts[i].title}
                                      </div>
                                      <div className="text-2-name-1-2">
                                        {priceComma(displayedProducts[i].price)}{" "}
                                        원
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="td-2">
                        <div className="text-button">
                          <Button
                            onClick={() => {
                              console.log(wish[i].wishListId);
                              call(
                                `/user/wishlist/${wish[i].wishListId}`,
                                "DELETE"
                              ).then((response) => {
                                if (response.error === "success") {
                                  const filteredWish = wish.filter(
                                    (w) => w.wishListId !== wish[i].wishListId
                                  );
                                  setWish(filteredWish);
                                }
                              });
                            }}
                            className="text-button-1"
                          >
                            상품삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {wish && wish.length !== 0 ? (
          <div className="pagination1">
            <button onClick={prevPageNumLength} disabled={pageNumLength === 0}>
              이전
            </button>
            {pageBtns}
            <button
              onClick={nextPageNumLength}
              disabled={pageNumLength === Math.ceil(wish.length / 2) - 1}
            >
              다음
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default WishList;
