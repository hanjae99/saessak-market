import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { deleteItem } from "../../userSlice";

const Check = () => {
  const movePage = useNavigate();
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(users[1].userproduct);

  return (
    <div className="section">
      <div className="manu-2">
        <div className="manu-2-1">
          {/* <div className="manu-2-1-1">
                    <span className="section-title">회원정보</span>
                  </div> */}
          <div className="tbody-1">
            <div className="text-0">
              {users[1].userproduct &&
                users[1].userproduct.map((a, i) => (
                  <div key={i}>
                    <div className="table-main">
                      <div className="table-body">
                        <div className="table-day">"2023. 08. 23 주문"</div>
                      </div>
                      <div className="td-main">
                        <div className="td-1">
                          <div className="td-1-1">
                            <div className="td-1-1-1">
                              <span className="td-1-1-1-1">구매확정</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-1">
                              <div className="text-1-1">
                                <div className="text-2">
                                  <div className="text-2-1">
                                    <div className="text-2-img">
                                      <img
                                        className="img1"
                                        src={users[1].userproduct[i].imgsrc1}
                                        alt=""
                                      />
                                    </div>
                                    <div className="text-2-name">
                                      <div className="text-2-name-1">
                                        <div className="text-2-name-1-1">
                                          {users[1].userproduct[i].name}
                                        </div>
                                        <div className="text-2-name-1-2">
                                          {users[1].userproduct[i].price}
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
                                dispatch({
                                  type: "user/deleteItem",
                                  payload: users[1].userproduct[i].id,
                                });
                              }}
                              variant="outline-danger"
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
