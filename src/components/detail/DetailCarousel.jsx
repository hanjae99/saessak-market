import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DetailCarousel = ({ item }) => {
  const { imgsrc1, imgsrc2, imgsrc3 } = item;
  const imgList = [imgsrc1, imgsrc2, imgsrc3].filter((il) => il !== "");
  const imgBox = imgList.map((il) => (
    <div key={il} className="detail-imgBox">
      <img src={il} alt="캐러셀이미지" />
    </div>
  ));
  return (
    <Carousel
      showArrows={true}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      selectedItem={item}
    >
      {imgBox}
    </Carousel>
  );
};

export default DetailCarousel;
