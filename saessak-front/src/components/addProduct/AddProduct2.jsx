import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadProduct } from "../../ApiService";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "./AddProduct.scss";

const AddProduct2 = () => {
  const [imgFile, setImgFile] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken !== "") {
      // 로그인한 상태
      setIsLogin(true);
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, []);

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const newImgFile = [...imgFile, file];

    setImgFile(newImgFile);
    setImgCount(imgCount + 1);

    console.log(imgFile);
  };

  const removeImg = (file) => {
    const newImgFile = imgFile.filter((f) => f !== file);
    setImgFile(newImgFile);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const wantPlace = e.target.elements.wantPlace.value;
    const text = e.target.elements.text.value;

    const formData = new FormData();

    formData.append("title", name);
    formData.append("price", price);
    formData.append("content", text);
    formData.append("mapData", wantPlace);

    // 이미지 파일 추가
    for (let i = 0; i < imgFile.length; i++) {
      formData.append("productImgFileList", imgFile[i]);
    }

    // console.log(e.target.elements.chooseFile.value);

    // dispatch({ type: "product/add", payload: newProduct });
    // navigate("/search");

    uploadProduct("/product/new", "POST", formData).then((response) => {
      const result = response.data[0];
      if (result === "success") {
        alert(result);
        navigate("/search");
      } else {
        alert(result);
      }
    });
  };

  let content = (
    // <div style={{ width: "100px", height: "100px", color: "white" }}></div>
    <div>잘못된 요청!</div>
  );

  if (isLogin) {
    content = (
      <div>
        <Header />
        <main>
          <div className="addProductContainer">
            <div className="addContents">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="content-form"
                method="POST"
              >
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
                      // accept="image/*"
                      onChange={getImgSrc}
                      disabled={imgCount === 3}
                    />
                  </div>
                  <div className="previewImg">
                    {imgFile.map((file) => (
                      <div className="imgItem" key={URL.createObjectURL(file)}>
                        <img
                          className="imgItem"
                          src={URL.createObjectURL(file)}
                          alt="예시이미지"
                        />
                        <button onClick={() => removeImg(file)}>삭제</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="addName">
                  <input
                    type="text"
                    placeholder="새로운 새싹에게 이름을 지어주세요!"
                    name="name"
                  />
                </div>
                <div className="addPrice">
                  <input
                    type="text"
                    placeholder="새싹의 가격은?"
                    name="price"
                  />
                </div>
                <div className="addLocal">
                  <input
                    type="text"
                    placeholder="거래희망 지역을 알려주세요!"
                    name="wantPlace"
                  />
                </div>
                <div className="addText">
                  <textarea
                    name="text"
                    id=""
                    cols=""
                    rows="10"
                    placeholder="새싹의 정보를 알려주세요!"
                  ></textarea>
                </div>
                <div className="submitBtn">
                  <button type="submit">새싹 심기!</button>
                  <button
                    type="reset"
                    onClick={() => {
                      const resetImgFile = [];
                      setImgFile(resetImgFile);
                    }}
                  >
                    취소하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return content;
};

export default AddProduct2;
