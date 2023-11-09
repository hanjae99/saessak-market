import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../ApiConfig";
import { call } from "../../ApiService";
import { changeDateFormat } from "../../dateFormat";
import priceComma from "../../pricecomma";

const NewProduct = () => {
  const navigate = useNavigate();
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
            <div>{changeDateFormat(dto.regTime)}전</div>
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
