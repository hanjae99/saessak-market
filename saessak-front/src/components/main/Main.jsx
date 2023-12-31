import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";
import CarouselBox from "./CarouselBox";
import Footer from "./Footer";
import Header from "./Header";
import HotProduct from "./HotProduct";
import "./Main.scss";
import NewProduct from "./NewProduct";

const Main = () => {
  return (
    <div>
      <Header />
      <main>
        <div id="mainContainer">
          <div className="menu1">
            <div>
              <h2>
                <ThumbUpIcon
                  style={{ fontSize: "48px", translate: "0 15px" }}
                />{" "}
                당신을 위한 추천상품!
              </h2>
            </div>
            <CarouselBox />
          </div>
          <div className="menu2">
            <div>
              <h2>
                <LocalFireDepartmentIcon
                  style={{ fontSize: "48px", translate: "0 15px" }}
                />{" "}
                요즘 뜨는 상품
              </h2>
            </div>
            <HotProduct />
          </div>
          <div className="menu3">
            <div>
              <h2>
                <AccessAlarmIcon
                  style={{ fontSize: "48px", translate: "0 15px" }}
                />{" "}
                방금 등록된 상품
              </h2>
            </div>
            <NewProduct />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
