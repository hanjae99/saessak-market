import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { API_BASE_URL } from "../../ApiConfig";

const DetailCarousel = ({ detaildatas }) => {
  const imgBox = detaildatas.map((imgUrl) => (
    <div key={imgUrl} className="detail-imgBox">
      <img src={API_BASE_URL + imgUrl} alt="캐러셀이미지" />
    </div>
  ));
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      selectedItem={detaildatas.length}
    >
      {imgBox}
    </Carousel>
  );
};

export default DetailCarousel;
