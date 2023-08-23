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

const Game = () => {
  const game = useSelector((state) => state.game);
  const score = useSelector((state) => state.score.no);
  console.log("score : " + score);
  const dispatch = useDispatch();

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

  const onChange = useCallback((e) => {
    setInputprice(e.target.value);
  }, []);

  function Percentage(number, percentage) {
    return (number * percentage) / 100;
  }

  const onsubmit = useCallback(() => {
    const money = parseInt(
      game[index].price.replace(",", "").replace("원", "")
    );
    console.log("inputprice +" + inputprice);
    console.log("money" + money);
    const per10 = Percentage(money, 10);
    const per20 = Percentage(money, 20);
    const per30 = Percentage(money, 30);
    const per40 = Percentage(money, 40);
    const per50 = Percentage(money, 50);

    let calc = Math.abs(inputprice - money);
    console.log("calc" + calc);

    // console.log("오십퍼센트" + per50);
    // console.log("사십퍼센트" + per40);
    // console.log("삼십퍼센트" + per30);
    // console.log("이십퍼센트" + per20);

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
    }

    setModalOpen(true);
  }, [game, index, inputprice, result]);
  console.log("result :" + result);

  useEffect(() => {
    console.log("useEffect : ", index);
    if (index === 10) {
      setIndex(9);
      navigate("/gameresult/" + score);
    }
  }, [score]);
  return (
    <div className="container">
      <h1>HOW MUCH?? 중고가격 맞추기 게임</h1>
      <div className="contentsBox">
        <div className="contentsBox2">
          <div className="products">
            <img
              src={game[index] && game[index].imgsrc1}
              alt="이미지"
              className="imgBox"
            />
          </div>

          <div className="products">
            <div>
              <lable>제품명:{game[index] && game[index].name}</lable>
            </div>
            <div>
              <p>{game[index] && game[index].text}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="contentsBox2"></div>
          <div>진행률 :{index + 1}/10</div>
          <input
            type="number"
            value={inputprice}
            placeholder="가격을 입력해주세요 (숫자만) ex)15000"
            onChange={onChange}
          />
          <button onClick={onsubmit}>입력</button>
          {modalOpen && (
            <GameModal
              setModalOpen={setModalOpen}
              inputprice={inputprice}
              result={result}
              onIncrease={onIncrease}
              index={index}
            />
          )}
        </div>
      </div>
      {/* <div>
        <div>이미지</div>
        <label>입력하신 가격 :</label>
        <p>{inputprice}원</p>
        <label>중고 가격 :</label>
        <p>{game[0].price}</p>
        <h1>점수 : {result}점</h1>
      </div> */}
    </div>
  );
};

export default Game;
