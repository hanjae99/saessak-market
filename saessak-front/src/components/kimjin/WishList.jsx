import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { call } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";
import { Start } from "@mui/icons-material";

const WishList = () => {
  const movePage = useNavigate();
  const [wish, setWish] = useState([]);

  useEffect(() => {
    call("/user/wishlist", "GET").then((response) => {
      setWish(response.data);
      console.log(response);
    });
  }, []);

  // const onProductDelete = (e) => {
  //   // const item = {wishListId == wish.wishListId}
  //   console.log(wish);
  //   call(`/user/wishlist/${wish.}`, "DELETE").then((response) => {});
  // };

  console.log(wish);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          <div className="tbody-1">
            {wish &&
              wish.map((a, i) => (
                <div key={i}>
                  <div className="table-main">
                    <div className="table-body">
                      <div className="table-day">
                        {(() => {
                          const date = new Date(wish[i].updateTime);
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
                              {wish[i].sellStatus}
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
                                    movePage("/detail/" + wish[i].productId)
                                  }
                                >
                                  <div className="text-2-img">
                                    <img
                                      className="img1"
                                      src={`${API_BASE_URL}${wish[i].imgUrl}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-2-name">
                                    <div className="text-2-name-1">
                                      <div className="text-2-name-1-1">
                                        {wish[i].title}
                                      </div>
                                      <div className="text-2-name-1-2">
                                        {wish[i].price}
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
      </div>
    </div>
  );
};
export default WishList;
