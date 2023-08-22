import React from "react";
import data from "../../product.json";

const NewProduct = () => {
  return (
    <div className="newProductContainer">
      {data.slice(10, 14).map((d) => (
        <div className="newItem" key={d.id}>
          <img src={d.imgsrc1} alt={d.name} />
          <p>상품명: {d.name}</p>
          <p>상품가격: {d.price}</p>
        </div>
      ))}
    </div>
  );
};

export default NewProduct;
