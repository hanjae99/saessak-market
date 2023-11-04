import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { call } from "../../ApiService";
import { API_BASE_URL } from "../../ApiConfig";
import { MdVisibility } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import priceComma from "../../pricecomma";
import { changeDateFormat } from "../../dateFormat";

const NewProduct = () => {
  // const state = useSelector((state) => state.product);
  const navigate = useNavigate();
  const now = new Date().getTime();
  const [newProductDTO, setNewProductDTO] = useState([]);

  useEffect(() => {
    call("/main/searchnewest", "GET").then((response) => {
      if (response.error && response.error != null) {
        alert(response.error);
        return;
      }
      setNewProductDTO(response.data);
    });
  }, []);

  return (
    <div className="newProductContainer">
      {/* {state.slice(0, 4).map((d) => {
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
      })} */}
      {newProductDTO.map((dto) => (
        <div
          className="newItem"
          key={dto.id}
          onClick={() => {
            navigate("/detail/" + dto.id);
          }}
        >
          <img src={API_BASE_URL + dto.imgUrl} alt={dto.title} />
          <div className="newItemTitle">
            <span>{dto.title}</span>
          </div>
          <p>{priceComma(dto.price)}원</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{changeDateFormat(dto.updateTime)}전</div>
            <div>
              <MdVisibility style={{ fontSize: "14px" }} /> {dto.clickedCount}{" "}
              <MdFavoriteBorder style={{ fontSize: "14px" }} />{" "}
              {dto.wishedCount}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewProduct;
