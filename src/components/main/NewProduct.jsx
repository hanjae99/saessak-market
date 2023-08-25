import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const state = useSelector((state) => state.product);
  const navigate = useNavigate();
  const now = new Date().getTime();

  return (
    <div className="newProductContainer">
      {state.slice(0, 4).map((d) => {
        return (
          <div
            className="newItem"
            key={d.id}
            onClick={() => {
              navigate("/detail/" + d.id);
            }}
          >
            <img src={d.imgsrc1} alt={d.name} />
            <div className="newItemTitle">
              <span>상품명: {d.name}</span>
            </div>
            <p>상품가격: {d.price}</p>
            <p>{Math.floor((now - Date.parse(d.uptime)) / 1000 / 60)}분전</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewProduct;
