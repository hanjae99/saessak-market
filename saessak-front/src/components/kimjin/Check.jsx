import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { call } from "../../ApiService";
import { useState } from "react";
import { API_BASE_URL } from "../../ApiConfig";

const Check = () => {
  const movePage = useNavigate();

  const [buyProduct, setBuyProduct] = useState([]);

  useEffect(() => {
    call("/user/check", "GET").then((response) => {
      setBuyProduct(response.data);
      console.log(response);
    });
  }, []);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            <div className="text-0">
              {buyProduct &&
                buyProduct.map((a, i) => (
                  <div key={i}>
                    <div className="table-main">
                      <div className="table-body">
                        <div className="table-day">
                          {(() => {
                            const date = new Date(buyProduct[i].updateTime);
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
                                {buyProduct[i].sellStatus}
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
                                      movePage(
                                        "/detail/" + buyProduct[i].productId
                                      )
                                    }
                                  >
                                    <div className="text-2-img">
                                      <img
                                        className="img1"
                                        src={`${API_BASE_URL}${buyProduct[i].imgUrl}`}
                                        alt=""
                                      />
                                    </div>
                                    <div className="text-2-name">
                                      <div className="text-2-name-1">
                                        <div className="text-2-name-1-1">
                                          {buyProduct[i].title}
                                        </div>
                                        <div className="text-2-name-1-2">
                                          {buyProduct[i].price}
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
                                console.log(buyProduct[i].buyListId);
                                call(
                                  `/user/check/${buyProduct[i].buyListId}`,
                                  "DELETE"
                                ).then((response) => {
                                  if (response.error === "success") {
                                    const filteredWish = buyProduct.filter(
                                      (w) =>
                                        w.buyListId !== buyProduct[i].buyListId
                                    );
                                    setBuyProduct(filteredWish);
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
      </div>
    </div>
  );
};

export default Check;
