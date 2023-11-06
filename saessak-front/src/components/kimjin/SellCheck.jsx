import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { call } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";

const SellCheck = () => {
  const movePage = useNavigate();

  const [sellProduct, setSellProduct] = useState([]);

  useEffect(() => {
    call("/user/sellcheck", "GET").then((response) => {
      setSellProduct(response.data);
      console.log(response);
    });
  }, []);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            <div className="text-0">
              {sellProduct &&
                sellProduct.map((a, i) => (
                  <div key={i}>
                    <div className="table-main">
                      <div className="table-body">
                        <div className="table-day">
                          {(() => {
                            const date = new Date(sellProduct[i].updateTime);
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
                                {sellProduct[i].sellStatus}
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
                                        "/detail/" + sellProduct[i].productId
                                      )
                                    }
                                  >
                                    <div className="text-2-img">
                                      <img
                                        className="img1"
                                        src={`${API_BASE_URL}${sellProduct[i].imgUrl}`}
                                        alt=""
                                      />
                                    </div>
                                    <div className="text-2-name">
                                      <div className="text-2-name-1">
                                        <div className="text-2-name-1-1">
                                          {sellProduct[i].title}
                                        </div>
                                        <div className="text-2-name-1-2">
                                          {sellProduct[i].price} 원
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
      </div>
    </div>
  );
};

export default SellCheck;
