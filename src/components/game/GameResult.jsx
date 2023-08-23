import React from "react";
import "./GameResult.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const GameResult = () => {
  const { finalresult } = useParams();
  const navigate = useNavigate();

  console.log(finalresult);
  // const 받을변수 = useParams().key;
  const game = useSelector((state) => state.game);

  return (
    <div className="container1">
      <h3> 당신의 점수는 ?!</h3>
      <h1>{finalresult}점</h1>
      <h3>물가 전문가!</h3>
      <p>지금 보신 상품은 어떠신가요?</p>

      <div className="imgBoxs">
        {game &&
          game.map((p) => (
            <div className="products">
              <div
                className="imgBox1"
                onClick={() => {
                  navigate("/detail/" + p.id);
                }}
              >
                <img className="img1" src={p.imgsrc1} alt="이미지1" />
                <div className="text1">
                  <p>{p.name}</p>
                  <p>{p.price}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameResult;
