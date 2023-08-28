import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

const CarouselBox = () => {
  const state = useSelector((state) => state.product);
  const [currentIndex, setCurrentIndex] = useState();
  const navigate = useNavigate();

  const sliceState = state.slice(10, 20);
  const imageBox = sliceState.map((s) => (
    <div key={s.id} className="slide-item">
      <img src={s.imgsrc1} alt={s.name} />
      <div className="slide-textBox">
        <div className="slide-title">
          <p className="slide-text">{s.name}</p>
        </div>
        <p className="slide-text">{s.price}</p>
        <p className="slide-text">
          {Math.floor(
            (new Date().getTime() - Date.parse(s.uptime)) / 1000 / 60
          )}
          분전
        </p>
      </div>
    </div>
  ));
  const handleChange = (index) => {
    setCurrentIndex(index);
  };
  const handleClick = (index, elem) => {
    navigate("/detail/" + sliceState[index].id);
  };

  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      selectedItem={sliceState[currentIndex]}
      onChange={handleChange}
      onClickItem={handleClick}
      centerMode={true}
      centerSlidePercentage={50}
      className="carousel-style"
    >
      {imageBox}
    </Carousel>
  );
};

export default CarouselBox;
