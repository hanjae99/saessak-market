import React from "react";
import Header from "./Header";
import "./Main.scss";
import Carousel from "./Carousel";
import HotProduct from "./HotProduct";
import NewProduct from "./NewProduct";
import Footer from "./Footer";

const Main = () => {
  return (
    <div>
      <Header />
      <main>
        <div id="mainContainer">
          <div className="menu1">
            <div>
              <h2>당신을 위한 추천상품!</h2>
            </div>
            <Carousel />
          </div>
          <div className="menu2">
            <div>
              <h2>요즘 뜨는 상품</h2>
            </div>
            <HotProduct />
          </div>
          <div className="menu3">
            <div>
              <h2>방금 등록된 상품</h2>
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
