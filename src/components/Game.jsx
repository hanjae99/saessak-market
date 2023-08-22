import React, { useEffect, useState } from "react";
import "./Game.css";
import { useSelector } from "react-redux";

const Game = () => {
  const product = useSelector((state) => state.product);

  function getRandomItemsFromArray(array, numberOfItems) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray.slice(0, numberOfItems);
  }

  const [randomData, setRandomData] = useState();

  useEffect(() => {
    const randomizedData = getRandomItemsFromArray(product, 10);
    setRandomData(randomizedData);
  }, []); // arrproduct가 변경될 때마다 실행

  console.log(randomData);
  return (
    <div className="container">
      <h1>HOW MUCH?? 중고가격 맞추기 게임</h1>
      <div className="contentsBox">
        <div className="contentsBox2">
          <div className="products">
            <img
              src={randomData && randomData[0].imgsrc1}
              alt="이미지"
              className="imgBox"
            />
          </div>

          <div className="products">
            <div>
              <lable>제품명:{randomData && randomData[0].name}</lable>
            </div>
            <div>
              <p>{randomData && randomData[0].text}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="contentsBox2"></div>
          <div>진행률 :1/10</div>
          <input
            type="number"
            placeholder="가격을 입력해주세요 (숫자만) ex)15000"
          />
          <button>입력</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
