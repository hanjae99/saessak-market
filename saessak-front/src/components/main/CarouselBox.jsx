import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdVisibility } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../ApiConfig";
import { call } from "../../ApiService";
import { changeDateFormat } from "../../dateFormat";
import priceComma from "../../pricecomma";

const CarouselBox = () => {
  const [currentIndex, setCurrentIndex] = useState();
  const navigate = useNavigate();
  const [randomDTO, setRandomDTO] = useState([]);

  useEffect(() => {
    // DB에서 랜덤 10개 상품 가져오기
    call("/main/searchrandom", "GET").then((response) => {
      if (response.error && response.error != null) {
        alert(response.error);
        return;
      }
      setRandomDTO(response.data);
    });
  }, []);

  const imageBox = randomDTO.map((dto) => (
    <div key={dto.id} className="slide-item">
      <div>
        <img src={API_BASE_URL + dto.imgUrl} alt={dto.title} />
      </div>
      <div className="slide-textBox">
        <div className="slide-title">
          <p className="slide-text">{dto.title}</p>
        </div>
        <p className="slide-text">{priceComma(dto.price)}원</p>
        <div
          className="slide-text"
          // style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>{changeDateFormat(dto.regTime)}전</div>
        </div>
        <p className="slide-text">
          <MdVisibility style={{ fontSize: "14px" }} /> {dto.clickedCount}{" "}
          <MdFavoriteBorder style={{ fontSize: "14px" }} /> {dto.wishedCount}
        </p>
      </div>
    </div>
  ));

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  const handleClick = (index, elem) => {
    navigate("/detail/" + randomDTO[index].id);
  };

  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showIndicators={false}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      selectedItem={randomDTO[currentIndex]}
      onChange={handleChange}
      onClickItem={handleClick}
      centerMode={true}
      centerSlidePercentage={35}
      className="carousel-style"
    >
      {imageBox}
    </Carousel>
  );
};

export default CarouselBox;
