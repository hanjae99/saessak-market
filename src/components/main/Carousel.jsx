import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "../../product.json";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const SlideImg = styled.img`
  width: 100%;
  height: 300px;
  margin-right: 30px;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  margin-top: 30px;
  position: relative;
`;

const Button = styled.button`
  border: 1px solid #ccc;
  background-color: #ccc;
  padding: 0.5em 1em;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    border: 1px solid coral;
    background-color: coral;
    color: #fff;
  }
  margin-right: 10px;
`;

const SliderContainer = styled.div`
  width: 1800px;
  // display: flex;
  // flex-wrap: nowrap;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0 30px;
`;

const total_slides = data.slice(0, 5).length;

// 캐러셀에 5개의 상품 노출
const Carousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= total_slides - 2) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(total_slides - 2);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 20}%)`;
  }, [currentSlide]);

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {data.slice(0, 5).map((d) => (
          <div key={d.id}>
            <SlideImg
              src={d.imgsrc1}
              onClick={() => {
                navigate("/detail/" + d.id);
              }}
            />
            <p>상품명: {d.name}</p>
            <p>상품가격: {d.price}</p>
          </div>
        ))}
      </SliderContainer>
      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <Button onClick={prevSlide}>
          <GrCaretPrevious />
        </Button>
        <Button onClick={nextSlide}>
          <GrCaretNext />
        </Button>
      </div>
    </Container>
  );
};

export default Carousel;
