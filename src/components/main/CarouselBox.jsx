// import React, { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
// import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
// import { useSelector } from "react-redux";

// const Container = styled.div`
//   width: 100%;
//   overflow: hidden;
//   margin-top: 30px;
//   position: relative;
// `;

// const SliderContainer = styled.div`
//   width: 5000px;
//   display: flex;
//   // display: grid;
//   // grid-template-columns: repeat(5, 1fr);
//   // gap: 0 30px;
// `;

// const Slide = styled.div`
//   width: 20%;
//   margin-right: 30px;
// `;

// const SlideImg = styled.img`
//   width: 80%;
//   height: 300px;
//   max-width: 80%;
// `;

// const Button = styled.button`
//   border: 1px solid #ccc;
//   background-color: #ccc;
//   padding: 0.5em 1em;
//   color: white;
//   cursor: pointer;
//   border-radius: 10px;
//   &:hover {
//     transition: all 0.3s ease-in-out;
//     border: 1px solid coral;
//     background-color: coral;
//     color: #fff;
//   }
//   margin-right: 10px;
// `;

// // 캐러셀에 12개의 상품 노출
// const Carousel = () => {
//   const state = useSelector((state) => state.product);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideRef = useRef(null);
//   const total_slides = 12;

//   const nextSlide = () => {
//     if (currentSlide >= total_slides / 2) {
//       setCurrentSlide(0);
//     } else {
//       setCurrentSlide(currentSlide + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentSlide === 0) {
//       setCurrentSlide(total_slides - 4);
//     } else {
//       setCurrentSlide(currentSlide / 2);
//     }
//   };

//   useEffect(() => {
//     slideRef.current.style.transition = "all 0.5s ease-in-out";
//     slideRef.current.style.transform = `translateX(-${currentSlide * 15}%)`;
//   }, [currentSlide]);

//   return (
//     <Container>
//       <SliderContainer ref={slideRef}>
//         {state.slice(2 * total_slides, 3 * total_slides).map((d) => (
//           <Slide key={d.id}>
//             <SlideImg src={d.imgsrc1} />
//             <p>상품명: {d.name}</p>
//             <p>상품가격: {d.price}</p>
//             <p>{d.uptimeminutes}분전</p>
//           </Slide>
//         ))}
//       </SliderContainer>
//       <div style={{ textAlign: "center", marginTop: "1rem" }}>
//         <Button onClick={prevSlide}>
//           <GrCaretPrevious />
//         </Button>
//         <Button onClick={nextSlide}>
//           <GrCaretNext />
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default Carousel;

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
        <p className="slide-text">{s.name}</p>
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
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      selectedItem={sliceState[currentIndex]}
      onChange={handleChange}
      onClickItem={handleClick}
      centerMode={true}
      centerSlidePercentage={30}
      className="carousel-style"
    >
      {imageBox}
    </Carousel>
  );
};

export default CarouselBox;
