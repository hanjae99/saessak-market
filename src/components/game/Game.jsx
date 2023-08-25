import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Game.css";
import { useDispatch, useSelector } from "react-redux";
import GameModal from "./GameModal";
import { useNavigate } from "react-router-dom";
import Header from "../main/Header";

const Game = () => {
  const game = useSelector((state) => state.game);
  const score = useSelector((state) => state.score.no);
  console.log("score : " + score);
  const dispatch = useDispatch();
  const gameBtn = useRef(null);

  const [index, setIndex] = useState(0);
  const [inputprice, setInputprice] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const [result, setResult] = useState(0);

  const onIncrease = () => {
    if (index < 10) {
      setIndex(index + 1);
      dispatch({ type: "score/resultadd", payload: result });
      // console.log("asdasdasdsadasasdasdasd" + score.sta;
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
    console.log("inputprice +" + inputprice);
    console.log("money : " + money);
    const per10 = Percentage(money, 10);
    const per20 = Percentage(money, 20);
    const per30 = Percentage(money, 30);
    const per40 = Percentage(money, 40);
    const per50 = Percentage(money, 50);

    let calc = Math.abs(inputprice - money);
    console.log("calc" + calc);

    console.log("오십퍼센트" + per50);
    console.log("사십퍼센트" + per40);
    console.log("삼십퍼센트" + per30);
    console.log("이십퍼센트" + per20);

    if (calc >= per50) {
      setResult(2);
    } else if (calc >= per40) {
      setResult(4);
    } else if (calc >= per30) {
      setResult(6);
    } else if (calc >= per20) {
      setResult(8);
    } else if (calc >= per10) {
      setResult(10);
    } else {
      setResult(10);
    }

    setModalOpen(true);
  }, [game, index, inputprice]);
  console.log("result :" + result);

  useEffect(() => {
    console.log("useEffect : ", index);
    if (index === 10) {
      setIndex(9);
      navigate("/gameresult/" + score);
    }
  }, [index, navigate, score]);
  return (
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
                <lable className="game-productslable">제품명:</lable>
                <div className="game-productslablediv">
                  {game[index] && game[index].name}
                </div>
              </div>

              <lable className="game-productslable">제품설명:</lable>
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
  );
};

export default Game;
