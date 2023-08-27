import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Check from "./Check";
import Changing from "./Changing";
import ChangingPwd from "./ChangingPwd";
import WishList from "./WishList";
import MyPage from "./mypage";
import Header from "../main/Header";
import Footer from "../main/Footer";

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
        >
          {/* <div
          style={{
            width: "calc(100%)",
            height: "100%",
            backgroundColor: "rgb(130, 188, 226)",
            backgroundImage: "url(../../img/tree.png)",
          }}
          className="newmain2"
        ></div> */}
        </div>
        <div className="newmain3" style={{ display: "flex", width: "100%" }}>
          <div className="layout-1">
            <div className="menuBtn1">
              <img
                src="../../img/saessak.png"
                alt=""
                className="menuBtn1-img"
              />
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/mypage")}>
              마이페이지
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/check")}>
              상품 조회
            </div>
            <div className="menuBtn" onClick={() => navigate("/user/wishlist")}>
              찜 목록
            </div>
          </div>
          <div className="newmain4">
            <Routes>
              <Route path="/mypage" element={<MyPage />}></Route>
              <Route path="/check" element={<Check />}></Route>
              <Route path="/changing" element={<Changing />}></Route>
              <Route path="/changingpwd" element={<ChangingPwd />}></Route>
              <Route path="/wishlist" element={<WishList />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    // <div className="all">
    //   <Header />
    //   <div>
    //     <div className="manu-main">
    //       <div className="manu">
    //         <div className="manu-1">
    //           <div className="logo1">
    //             <div className="logo2">
    //               <span className="logo3">
    //                 <span>새싹</span>
    //               </span>
    //             </div>
    //           </div>
    //           <nav>
    //             <div className="li-1">
    //               <div
    //                 className="btn li-1-1"
    //
    //               >
    //                 마이페이지
    //               </div>
    //               <div
    //                 className="btn li-1-2"
    //
    //               >
    //                 상품조회
    //               </div>
    //               <div
    //                 className="btn li-1-3"
    //
    //               >
    //                 찜 목록
    //               </div>
    //             </div>
    //           </nav>
    //         </div>
    //       </div>
    //       <div>
    //         <Routes>
    //           <Route path="/mypage" element={<MyPage />}></Route>
    //           <Route path="/check" element={<Check />}></Route>
    //           <Route path="/changing" element={<Changing />}></Route>
    //           <Route path="/changingpwd" element={<ChangingPwd />}></Route>
    //           <Route path="/wishlist" element={<WishList />}></Route>
    //         </Routes>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
