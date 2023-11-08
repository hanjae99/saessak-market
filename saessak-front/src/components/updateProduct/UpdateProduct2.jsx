import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../ApiConfig";
import { call, uploadProduct } from "../../ApiService";
import { loginCheck } from "../../loginCheck";
import "../addProduct/AddProduct.scss";
import Footer from "../main/Footer";
import Header from "../main/Header";

const UpdateProduct2 = () => {
  const [imgFile, setImgFile] = useState([]);
  const [imgCount, setImgCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState("");
  const [productContent, setProductContent] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSellStatus, setProductSellStatus] = useState("");
  const [productMapData, setProductMapData] = useState("");
  const [imageDTOList, setImageDTOList] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [categoryDTO, setCategoryDTO] = useState([]);
  const [selectedCate, setSelectedCate] = useState(0);
  const { kakao, daum } = window;
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();

  useEffect(() => {
    const result = loginCheck();
    if (result === "token expired") {
      setIsLogin(false);
      alert("로그인 시간이 만료되었습니다, 다시 로그인해주세요!");
      navigate("/login");
    } else if (result === "login ok") {
      setIsLogin(true);

      // 카테고리 정보 가져오기
      call("/product/searchcate", "GET").then((response) => {
        if (response.data && response.data != null) {
          setCategoryDTO(response.data);
        }
      });

      // 지도 가져오기
      kakao.maps.load(() => {
        const container = document.getElementById("map_update");
        const options = {
          // center: new kakao.maps.LatLng(33.450701, 126.570667),
          center: new kakao.maps.LatLng(37.489972, 126.927158),
          level: 3,
        };

        setMap(new kakao.maps.Map(container, options));
        setMarker(new kakao.maps.Marker());
      });

      call("/product/searchone", "POST", { id: id }).then((response) => {
        if (response.error && response.error !== "") {
          if (response.error === "no authority") {
            alert("상품 수정권한이 없습니다");
            navigate(-1);
            return;
          } else if (response.error === "no product") {
            alert("존재하지 않는 상품입니다");
            navigate(-1);
            return;
          }
        }

        setProductTitle(response.data[0].title);
        setProductContent(response.data[0].content);
        setProductPrice(response.data[0].price);
        setProductSellStatus(response.data[0].sellStatus);
        setProductMapData(response.data[0].mapData);
        const responseImgFileList = response.data[0].imageDTOList;
        setImgCount(responseImgFileList.length);
        setImageDTOList(responseImgFileList);
        setSelectedCate(response.data[0].categoryId);
      });
    } else {
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, [id]);

  const getImgSrc = (e) => {
    const file = e.target.files[0];
    const newImgFile = [...imgFile, file];
    const newImgDTO = [
      ...imageDTOList,
      {
        id: "",
        imgName: "",
        oriName: "",
        imgUrl: URL.createObjectURL(file),
      },
    ];

    setImgFile(newImgFile);
    setImageDTOList(newImgDTO);
    setImgCount(imgCount + 1);
  };

  const removeImg = (imgDTO) => {
    const newImgFile = imgFile.filter(
      (f) => URL.createObjectURL(f) !== imgDTO.imgUrl
    );
    const newImgDTOList = imageDTOList.filter(
      (img) => img.imgUrl !== imgDTO.imgUrl
    );
    setImgFile(newImgFile);
    setImageDTOList(newImgDTOList);
    setImgCount(imgCount - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imageDTOList && imageDTOList.length === 0) {
      alert("이미지는 적어도 하나 이상 있어야 해요!");
      return;
    }

    // 이미지 DTO 추가
    let newImageDTOList = [];
    if (imageDTOList && imageDTOList.length > 0) {
      for (let i = 0; i < imageDTOList.length; i++) {
        // 기존에 가져왔던 데이터만 다시 실어서 보냄
        if (imageDTOList[i].id !== "") {
          newImageDTOList.push(imageDTOList[i]);
        }
      }
    }

    const request = {
      id: id,
      title: productTitle,
      price: productPrice,
      content: productContent,
      mapData: productMapData,
      sellStatus: productSellStatus,
      imageDTOList: newImageDTOList,
      categoryId: selectedCate,
    };

    // 상품 및 기존 이미지 정보만 먼저 업데이트
    call("/product/update", "POST", request).then((response) => {
      const result = response.data[0];
      alert(result);
      if (result === "success") {
        navigate("/search");
      }
    });

    // 새로 추가한 이미지 업로드
    if (imgFile && imgFile.length > 0) {
      const uploadImg = new FormData();
      uploadImg.append("id", id);
      for (let i = 0; i < imgFile.length; i++) {
        uploadImg.append("productImgList", imgFile[i]);
      }

      uploadProduct("/product/upload", "POST", uploadImg).then((response) => {
        const result2 = response.data[0];
        alert(result2);
        if (result2 === "imgUpload success") {
          navigate("/search");
        }
      });
    }
  };

  const handleTitle = (e) => {
    setProductTitle(e.target.value);
  };

  const handlePrice = (e) => {
    setProductPrice(e.target.value);
  };

  const handleContent = (e) => {
    setProductContent(e.target.value);
  };

  const handleMapData = (e) => {
    setProductMapData(e.target.value);
  };

  const handleSellStatus = (e) => {
    setProductSellStatus(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedCate(e.target.value);
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
            setProductMapData(addr);
          }
        });
      },
    }).open();
  };

  // 상품에 판매하는 주소가 이미 있는 경우
  if (productMapData && map && marker) {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(productMapData, function (results, status) {
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
  }

  // 로그인 하지 않은 유저
  if (
    localStorage.getItem("ACCESS_TOKEN") === null ||
    localStorage.getItem("ACCESS_TOKEN") === ""
  ) {
    navigate("/login");
  }

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
                  {imageDTOList.map((imgDTO) => (
                    <div className="imgItem" key={imgDTO.imgUrl}>
                      <img
                        className="imgItem"
                        src={
                          imgDTO.imgUrl.includes("/images/product")
                            ? API_BASE_URL + imgDTO.imgUrl
                            : imgDTO.imgUrl
                        }
                        alt="예시이미지"
                      />
                      <button onClick={() => removeImg(imgDTO)}>삭제</button>
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
              <div className="addSellStatus">
                <h3>현재 새싹의 상태에요!</h3>
                <FormControl required sx={{ m: 1, minWidth: 140 }} size="small">
                  <InputLabel id="demo-simple-select-required-label">
                    판매상태를 선택!
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={productSellStatus === "" ? "" : productSellStatus}
                    // label="Age *"
                    onChange={handleSellStatus}
                  >
                    <MenuItem value="SELL">판매중</MenuItem>
                    <MenuItem value="SOLD_OUT">판매완료</MenuItem>
                    <MenuItem value="HIDDEN">숨김상태</MenuItem>
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
                  value={productTitle}
                  onChange={handleTitle}
                  required
                />
              </div>
              <div className="addPrice">
                <h3>새싹의 가격은 얼마일까요??</h3>
                <input
                  type="number"
                  placeholder="과연 얼마?"
                  name="price"
                  value={productPrice}
                  onChange={handlePrice}
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
                  value={productMapData}
                  onChange={handleMapData}
                  onClick={onClickAddr}
                />
                <div id="map_update" className="map"></div>
              </div>
              <div className="addText">
                <h3>새싹에 대해 자랑해주세요!</h3>
                <textarea
                  name="text"
                  id=""
                  cols=""
                  rows="10"
                  placeholder="새싹의 정보를 알려주세요!"
                  onChange={handleContent}
                  value={productContent}
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

export default UpdateProduct2;
