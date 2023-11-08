import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { call } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";
import { useCallback } from "react";
import priceComma from "../../pricecomma";

const SellCheck = ({ total, limit, page, setPage }) => {
  const movePages = useNavigate(); // 내비게이션 기능 사용하기 위해 useNavigate 훅 사용

  const [sellProduct, setSellProduct] = useState([]); // 판매 상품 상태 초기화

  const [totalPage, setTotalPage] = useState(0);

  // 판매 상품 데이터 가져오기
  useEffect(() => {
    call("/user/sellcheck", "GET").then((response) => {
      setSellProduct(response.data);
      console.log(response);
    });
  }, []);

  // 페이징 처리(한 페이지당 30개의 상품 노출)
  const [pageBtns, setPageBtns] = useState([]); // 페이지 버튼들을 저장하는 상태 변수
  const [pageNumLength, setpageNumLength] = useState(0); // 페이지 갯수

  // 페이지 이동 처리 함수
  const movePage = useCallback((i) => {
    setpageNumLength(i); // 선택된 페이지로 pageNumLength 설정
    window.scrollTo(0, 0); // 페이지 이동 후 맨 위로 스크롤
  }, []);

  useEffect(() => {
    // 총 페이지 수 계산
    setTotalPage(Math.ceil(sellProduct && sellProduct.length / 10));

    const makePageBtn = () => {
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
  }, [sellProduct, pageNumLength]);

  console.log("sellProduct", sellProduct);
  console.log("totalPage", totalPage);
  console.log("pageNumLength", pageNumLength);
  console.log("pageBtns", pageBtns);

  // page 버튼 6개씩 보여주기
  const prevPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength - 1); // 이전 페이지 세트로 이동
  }, [pageNumLength]);

  const nextPageNumLength = useCallback(() => {
    setpageNumLength(pageNumLength + 1); // 다음 페이지 세트로 이동
  }, [pageNumLength]);

  const itemsPerPage = 10; // 페이지당 상품 수
  const [displayedProducts, setDisplayedProduct] = useState([]);

  useEffect(() => {
    const displayedProduct =
      sellProduct &&
      sellProduct.slice(
        pageNumLength * itemsPerPage,
        Math.min((pageNumLength + 1) * itemsPerPage, sellProduct.length)
      );
    setDisplayedProduct(displayedProduct);
  }, [sellProduct, pageNumLength, movePage]);
  console.log(displayedProducts);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            <div className="text-0">
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
                                          {priceComma(
                                            displayedProducts[i].price
                                          )}{" "}
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
                                const item = {};
                                console.log(sellProduct[i].productId);
                                call(
                                  `/user/sellcheck/${sellProduct[i].productId}`,
                                  "PUT"
                                ).then((response) => {
                                  if (response.error === "success") {
                                    const filteredWish = sellProduct.filter(
                                      (w) =>
                                        w.productId !== sellProduct[i].productId
                                    );
                                    setSellProduct(filteredWish);
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
        </div>
        {sellProduct && sellProduct.length !== 0 ? (
          <div className="pagination1">
            <button onClick={prevPageNumLength} disabled={pageNumLength === 0}>
              이전
            </button>
            <button
              onClick={nextPageNumLength}
              disabled={pageNumLength + 1 >= totalPage}
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

export default SellCheck;
