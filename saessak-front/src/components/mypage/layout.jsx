import { Route, Routes, useNavigate } from "react-router-dom";
import Check from "../kimjin/Check";
import Changing from "../memberchange/Changing";
import ChangingPwd from "../memberchange/ChangingPwd";
import WishList from "../kimjin/WishList";
import MyPage from "./mypage";
import Header from "../main/Header";
import Footer from "../main/Footer";
import SellCheck from "../kimjin/SellCheck";
import ChangingPass from "../memberchange/ChangingPass";
import ChattingBox from "../kimjin/ChattingBox";

export const Layout = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="layout-main">
        <Header />
        <div
          style={{
            marginTop: "100px",
            width: "100%",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
          }}
          className="newmain1"
        ></div>
        <div className="newmain3" style={{ display: "flex", width: "100%" }}>
          <div className="layout-1">
            <div className="menuBtn1">
              <img src="../../img/leaf2.png" alt="" className="menuBtn1-img" />
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/mypage")}>
              마이페이지
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/check")}>
              구매 이력
            </div>
            <div
              className="menuBtn"
              onClick={() => navigate("/user/SellCheck")}
            >
              판매 상품
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/wishlist")}>
              찜 목록
            </div>
            <div
              className="menuBtn"
              onClick={() => navigate("/user/chattingbox")}
            >
              채팅
            </div>
          </div>
          <div className="newmain4">
            <Routes>
              <Route path="/mypage" element={<MyPage />}></Route>
              <Route path="/check" element={<Check />}></Route>
              <Route path="/sellcheck" element={<SellCheck />}></Route>
              <Route path="/changing" element={<Changing />}></Route>
              <Route path="/changingpwd" element={<ChangingPwd />}></Route>
              <Route path="/wishlist" element={<WishList />}></Route>
              <Route path="/changingpass" element={<ChangingPass />}></Route>
              <Route path="/chattingbox" element={<ChattingBox />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
