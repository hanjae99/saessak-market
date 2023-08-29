import React, { useCallback, useEffect, useState } from "react";
import "./Game.css";
import { useDispatch, useSelector } from "react-redux";
import GameModal from "./GameModal";
import { useNavigate } from "react-router-dom";
import Header from "../main/Header";
import Footer from "../main/Footer";

const Game = () => {
  const game = useSelector((state) => state.game);
  // console.log(game);
  const score = useSelector((state) => state.score.no);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
  const [inputprice, setInputprice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [result, setResult] = useState(0);

  const onIncrease = () => {
    if (index < 10) {
      setIndex(index + 1);
      dispatch({ type: "score/resultadd", payload: result });
    } else {
      navigate("/gameresult/" + score);
    }
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onsubmit();
      return;
    }
  };

  const onChange = useCallback((e) => {
    setInputprice(e.target.value);
  }, []);

  function Percentage(number, percentage) {
    return (number * percentage) / 100;
  }

  const onsubmit = useCallback(() => {
    const money = parseInt(
      game[index].price.replaceAll(",", "").replace("원", "")
    );

    // console.log("inputprice :" + inputprice);
    // console.log("money : " + money);

    if (!inputprice) {
      setInputprice(0);
    }

    const per20 = Percentage(money, 20);
    const per30 = Percentage(money, 30);
    const per40 = Percentage(money, 40);
    const per50 = Percentage(money, 50);

    let calc = Math.abs(inputprice - money);

    if (calc >= per50) {
      setResult(2); //오십퍼 이상 5000원 이상
    } else if (calc >= per40) {
      setResult(4); //사십퍼 이상 4000원 이상
    } else if (calc >= per30) {
      setResult(6); //삼십퍼 이상 3000원 이상
    } else if (calc >= per20) {
      setResult(8); //이십퍼 이상 2000원 이상
    } else if (calc >= 0) {
      setResult(10); //10퍼 이상 0원 이상
    } else {
      setResult(2);
    }

    setModalOpen(true);
  }, [game, index, inputprice]);

  useEffect(() => {
    if (index === 10) {
      setIndex(9);
      navigate("/gameresult/" + score);
    }
  }, [index, navigate, score]);
  return (
    <>
      <div className="game-container">
        <Header />
        <main>
          <h1>HOW MUCH?? 중고가격 맞추기 게임</h1>
          <div className="game-contentsBox">
            <div className="game-contentsBox2">
              <div className="game-products1">
                <img
                  src={game[index] && game[index].imgsrc1}
                  alt="이미지"
                  className="game-imgBox"
                />
              </div>

              <div className="game-products">
                <div>
                  <label className="game-productslable">제품명</label>
                  <div className="game-productslablediv">
                    {game[index] && game[index].name}
                  </div>
                </div>

                <label className="game-productslable">제품설명</label>
                <div className="game-productstext">
                  <div className="game-productsdivtext">
                    {game[index] && game[index].text}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="game-proceeding">
                <div
                  className="game-process"
                  style={{ width: `${(index + 1) * 10}%` }}
                ></div>
                <div>진행률 :{index + 1}/10</div>
              </div>
              <div className="game-divinput">
                <input
                  className="game-inputbox"
                  type="number"
                  value={inputprice}
                  placeholder="가격을 입력해주세요 (숫자만) ex)15000"
                  onChange={onChange}
                  onKeyDown={onEnter}
                />
                <button className="game-inputbtn" onClick={onsubmit}>
                  입력!!
                </button>
              </div>
            </div>
          </div>
          {modalOpen && (
            <div className={modalOpen ? "modal-background" : ""}>
              <GameModal
                setModalOpen={setModalOpen}
                inputprice={inputprice}
                result={result}
                onIncrease={onIncrease}
                index={index}
              />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Game;
