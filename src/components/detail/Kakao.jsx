import React, { useEffect, useRef } from "react";
const { kakao } = window;

const Kakao = () => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const container = mapContainerRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.950701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "90%" }}>
      Kakao
    </div>
  );
};

export default Kakao;
