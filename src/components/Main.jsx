import React from "react";
import Header from "./Header";
import "./Main.css";
import Carousel from "./Carousel";

const Main = () => {
  return (
    <div>
      <Header />
      <main>
        <div id="mainContainer">
          <div>
            <div>
              <h3>당신을 위한 추천상품!</h3>
            </div>
            <Carousel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
