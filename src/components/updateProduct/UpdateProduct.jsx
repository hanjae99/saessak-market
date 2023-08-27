import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "../addProduct/AddProduct.scss";

const UpdateProduct = () => {
  const [imgSrc, setImgSrc] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const state = useSelector((state) => state.product);
  const wantUpdateItem = state.find((p) => p.id === id);
  const [itemName, setItemName] = useState(wantUpdateItem.name);
  const [itemPrice, setItemPrice] = useState(wantUpdateItem.price);
  const [itemWantPlace, setItemWantPlace] = useState(wantUpdateItem.wantPlace);
  const [itemText, setItemText] = useState(wantUpdateItem.text);

  useEffect(() => {
    if (wantUpdateItem.imgsrc1) {
      const { imgsrc1, imgsrc2, imgsrc3 } = wantUpdateItem;
      const imgsrcList1 = [imgsrc1, imgsrc2, imgsrc3];
      const imgsrcList2 = imgsrcList1.filter((p) => p !== "");
      setImgSrc(imgSrc.concat(imgsrcList2));
      setImgCount(imgsrcList2.length);
    }
  }, [wantUpdateItem]);

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    const fileSrc = URL.createObjectURL(file);
    const newImgSrc = [...imgSrc, fileSrc];
    setImgSrc(newImgSrc);
    setImgCount(imgCount + 1);
  };

  const removeImg = (src) => {
    const newImgSrc = imgSrc.filter((is) => is !== src);
    console.log(newImgSrc);
    setImgSrc(newImgSrc);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = itemName;
    const price = itemPrice;
    const wantPlace = itemWantPlace;
    const text = itemText;
    // console.log("name: ", name);
    // console.log("price: ", price);
    // console.log("location: ", location);
    // console.log("info: ", info);
    // const imgSrcPack = imgSrc.map((is, i) => {`imgSrc${i}`: is})
    const newProduct = {
      id,
      name,
      price,
      text,
      imgsrc1: imgSrc[0] || "",
      imgsrc2: imgSrc[1] || "",
      imgsrc3: imgSrc[2] || "",
      wantPlace,
    };

    dispatch({ type: "product/fix", payload: newProduct });
    navigate("/search/" + name);
    console.log(state);
  };

  const handleName = (e) => {
    setItemName(e.target.value);
  };

  const handlePrice = (e) => {
    setItemPrice(e.target.value);
  };

  const handleWantPlace = (e) => {
    setItemWantPlace(e.target.value);
  };

  const handleText = (e) => {
    setItemText(e.target.value);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="addProductContainer">
          <div className="imgUploadBox">
            <div>
              <div className="labelButton">
                <label htmlFor="chooseFile">
                  이미지를 넣어주세요! (최대 3장)
                </label>
              </div>
              <input
                type="file"
                name="chooseFile"
                id="chooseFile"
                accept="image/*"
                onChange={getImgSrc}
                disabled={imgCount === 3}
              />
            </div>
            <div className="previewImg">
              {imgSrc.map(
                (src) =>
                  src && (
                    <div className="imgItem" key={src}>
                      <img className="imgItem" src={src} alt="예시이미지" />
                      <button onClick={() => removeImg(src)}>삭제</button>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="addContents">
            <form onSubmit={handleSubmit}>
              <div className="addName">
                <input
                  type="text"
                  placeholder="새로운 새싹에게 이름을 지어주세요!"
                  name="name"
                  value={itemName}
                  onChange={handleName}
                />
              </div>
              <div className="addPrice">
                <input
                  type="text"
                  placeholder="새싹의 가격은?"
                  name="price"
                  value={itemPrice}
                  onChange={handlePrice}
                />
              </div>
              <div className="addLocal">
                <input
                  type="text"
                  placeholder="거래희망 지역을 알려주세요!"
                  name="wantPlace"
                  value={itemWantPlace}
                  onChange={handleWantPlace}
                />
              </div>
              <div className="addText">
                <textarea
                  name="text"
                  id=""
                  cols=""
                  rows="10"
                  placeholder="새싹의 정보를 알려주세요!"
                  value={itemText}
                  onChange={handleText}
                ></textarea>
              </div>
              <div className="submitBtn">
                <button type="submit">새싹 다시 심기!</button>
                <button
                  type="reset"
                  onClick={() => {
                    const resetImgSrc = [];
                    setImgSrc(resetImgSrc);
                  }}
                >
                  리셋
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateProduct;
