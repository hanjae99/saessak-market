import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { call, uploadProduct } from "../../ApiService";
import Footer from "../main/Footer";
import Header from "../main/Header";
import "./AddProduct.scss";
import { loginCheck } from "../../loginCheck";

const AddProduct2 = () => {
  const [imgFile, setImgFile] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [categoryDTO, setCategoryDTO] = useState([]);
  const [selectedCate, setSelectedCate] = useState(0);
  const navigate = useNavigate();
  const { kakao, daum } = window;
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    // const accessToken = localStorage.getItem("ACCESS_TOKEN");
    // if (accessToken !== "") {
    //   // 토큰 유효시간 검사
    //   const expiration = localStorage.getItem("EXPIREDATE");
    //   if (expiration && expiration != "") {
    //     const now = new Date().getTime();
    //     // 토큰 만료
    //     if (now >= Date.parse(expiration)) {
    //       localStorage.setItem("ACCESS_TOKEN", "");
    //       localStorage.setItem("EXPIREDATE", "");
    //       setIsLogin(false);
    //       alert("로그인 시간이 만료되었습니다");
    //       navigate("/login");
    //     } else {
    //       // 토큰 유지, 로그인 유지
    //       setIsLogin(true);

    //       // 카테고리 정보 가져오기
    //       call("/product/searchcate", "GET").then((response) => {
    //         // console.log(response.data);
    //         if (response.data && response.data != null) {
    //           setCategoryDTO(response.data);
    //         }
    //         console.log(categoryDTO);
    //       });

    //       // 지도 가져오기
    //       kakao.maps.load(() => {
    //         const container = document.getElementById("map_add");
    //         const options = {
    //           // center: new kakao.maps.LatLng(33.450701, 126.570667),
    //           center: new kakao.maps.LatLng(37.489972, 126.927158),
    //           level: 3,
    //         };

    //         setMap(new kakao.maps.Map(container, options));
    //         setMarker(new kakao.maps.Marker());
    //       });
    //     }
    //   }
    // } else {
    //   alert("로그인 후 이용해주세요!");
    //   navigate("/login");
    // }

    const result = loginCheck();
    if (result === "token expired") {
      setIsLogin(false);
      alert("로그인 시간이 만료되었습니다, 다시 로그인해주세요!");
      navigate("/login");
    } else if (result === "login ok") {
      setIsLogin(true);

      // 카테고리 정보 가져오기
      call("/product/searchcate", "GET").then((response) => {
        // console.log(response.data);
        if (response.data && response.data != null) {
          setCategoryDTO(response.data);
        }
        console.log(categoryDTO);
      });

      // 지도 가져오기
      kakao.maps.load(() => {
        const container = document.getElementById("map_add");
        const options = {
          // center: new kakao.maps.LatLng(33.450701, 126.570667),
          center: new kakao.maps.LatLng(37.489972, 126.927158),
          level: 3,
        };

        setMap(new kakao.maps.Map(container, options));
        setMarker(new kakao.maps.Marker());
      });
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, []);

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    const newImgFile = [...imgFile, file];

    setImgFile(newImgFile);
    setImgCount(imgCount + 1);
  };

  const removeImg = (file) => {
    const newImgFile = imgFile.filter((f) => f !== file);
    setImgFile(newImgFile);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgCount <= 0) {
      alert("최소 하나 이상의 이미지는 등록해야해요!");
      return;
    }
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const wantPlace = e.target.elements.wantPlace.value;
    const text = e.target.elements.text.value;

    const formData = new FormData();

    formData.append("title", name);
    formData.append("price", price);
    formData.append("content", text);
    formData.append("mapData", wantPlace);
    formData.append("categoryId", selectedCate);

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

  const handleSelect = (e) => {
    setSelectedCate(e.target.value);
    console.log(e.target.value);
  };

  const onClickAddr = () => {
    // 주소 -> 좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소 검색
    new daum.Postcode({
      oncomplete: function (data) {
        // 검색한 주소명
        const addr = data.address;

        // 주소 정보를 해당 input 태그에 입력
        document.getElementById("wantPlace").value = addr;
        // 주소로 상세 정보 검색
        geocoder.addressSearch(addr, function (results, status) {
          // 정상적으로 검색 완료
          if (status === kakao.maps.services.Status.OK) {
            const result = results[0];

            // 해당 주소에 대한 좌표를 받아
            const searchPos = new kakao.maps.LatLng(result.y, result.x);
            // 지도에 표시
            map.panTo(searchPos);
            marker.setMap(null);
            marker.setPosition(searchPos);
            marker.setMap(map);
          }
        });
      },
    }).open();
  };

  return (
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
              <div className="imgBoxTitle">
                <h3>새싹 이미지를 넣어주세요!</h3>
              </div>
              <div className="imgUploadBox">
                <div>
                  <div className="labelButton">
                    <label htmlFor="chooseFile">저를 클릭해봐요!</label>
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
              <div className="addCategory">
                <h3>어떤 종류의 새싹일까요??</h3>
                <FormControl required sx={{ m: 1, minWidth: 140 }} size="small">
                  <InputLabel id="demo-simple-select-required-label">
                    종류를 선택!
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={selectedCate === 0 ? "" : selectedCate}
                    // label="Age *"
                    onChange={handleSelect}
                  >
                    {categoryDTO.map((cate) => (
                      <MenuItem value={cate.id} key={cate.id}>
                        {cate.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    꼭 선택해주세요! (필수 입력값)
                  </FormHelperText>
                </FormControl>
              </div>
              <div className="addName">
                <h3>새싹의 이름은 뭘까요??</h3>
                <input
                  type="text"
                  placeholder="이름을 지어주세요!"
                  name="name"
                  required
                />
              </div>
              <div className="addPrice">
                <h3>새싹의 가격은 얼마일까요??</h3>
                <input
                  type="number"
                  placeholder="과연 얼마?"
                  name="price"
                  required
                />
              </div>
              <div className="addLocal">
                <h3>새 인연을 만날 장소를 정해요!</h3>
                <input
                  type="text"
                  placeholder="거래희망 지역을 알려주세요!"
                  name="wantPlace"
                  id="wantPlace"
                  readOnly
                  onClick={onClickAddr}
                />
                <div id="map_add" className="map"></div>
              </div>
              <div className="addText">
                <h3>새싹에 대해 자랑해주세요!</h3>
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
};

export default AddProduct2;
