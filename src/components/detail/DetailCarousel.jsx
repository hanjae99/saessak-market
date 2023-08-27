import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DetailCarousel = ({ item }) => {
  const { imgsrc1, imgsrc2, imgsrc3 } = item;
  const imgList = [imgsrc1, imgsrc2, imgsrc3].filter((il) => il !== "");
  console.log(imgList);
  const imgBox = imgList.map((il) => (
    <div key={il} className="detail-imgBox">
      <img src={il} alt="캐러셀이미지" />
    </div>
  ));
  return (
    <Carousel
      showArrows={true}
      autoPlay={false}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
    >
      {imgBox}
    </Carousel>
  );
};

export default DetailCarousel;
