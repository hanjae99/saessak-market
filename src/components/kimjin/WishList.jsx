import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Manu.css";
import { Button } from "react-bootstrap";
import { deleteItem } from "../../userSlice";

const WishList = () => {
  const movePage = useNavigate();
  const users = useSelector((state) => state.user);
  // console.log(users[1].userproduct.id)
  const dispatch = useDispatch();

  return (
    <div className="section">
      <div className="section_2">
        <div className="section-2-1"></div>
      </div>
      <div className="manu-2">
        <div className="manu-2-1">
          {/* <div className="manu-2-1-1">
                    <span className="section-title">회원정보</span>
                  </div> */}
          <tbody className="tbody-1">
            {users[2].userproduct.map((a, i) => (
              <div key={i}>
                <div className="table-main">
                  <tr>
                    <td className="td-1">
                      <div className="td-1-1">
                        <div className="td-1-1-1">
                          <span className="td-1-1-1-1">판매중</span>
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
                                    src={users[2].userproduct[i].imgsrc1}
                                    alt=""
                                  />
                                </div>
                                <div className="text-2-name">
                                  <div className="text-2-name-1">
                                    <div className="text-2-name-1-1">
                                      {users[2].userproduct[i].name}
                                    </div>
                                    <div className="text-2-name-1-2">
                                      {users[2].userproduct[i].price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="td-2">
                      <div className="text-button">
                        <Button
                          onClick={() => {
                            dispatch({
                              type: "user/deleteItem",
                              payload: users[2].userproduct[i].id,
                            });
                          }}
                          variant="outline-danger"
                          className="text-button-1"
                        >
                          상품삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                </div>
              </div>
            ))}
          </tbody>
        </div>
      </div>
    </div>
  );
};
export default WishList;
