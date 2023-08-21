import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../product.json";

const Slide = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 30px;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 2rem;
`;

const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
  margin-right: 10px;
`;

const SliderContainer = styled.div`
  width: 3000px;
  display: flex;
  flex-wrap: nowrap;
`;

const total_slides = data.slice(0, 7).length;

// 캐러셀에 7개의 상품 노출
const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= total_slides - 3) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(total_slides - 3);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 330}px)`;
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {data.slice(0, 7).map((d) => (
          <Slide src={d.imgsrc1} />
        ))}
      </SliderContainer>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Button onClick={prevSlide}>prev</Button>
        <Button onClick={nextSlide}>next</Button>
      </div>
    </Container>
  );
};

export default Carousel;
