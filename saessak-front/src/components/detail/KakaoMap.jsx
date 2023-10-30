import React, { useEffect } from "react";

const KakaoMap = ({ mapData }) => {
  const { kakao } = window;

  useEffect(() => {
    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(mapData, function (results, status) {
        // 정상적으로 검색 완료
        if (status === kakao.maps.services.Status.OK) {
          const result = results[0];

          const container = document.getElementById("map_detail");
          const options = {
            center: new kakao.maps.LatLng(result.y, result.x),
            level: 3,
          };

          const sellMap = new kakao.maps.Map(container, options);
          const sellMapMarker = new kakao.maps.Marker({
            position: sellMap.getCenter(),
          });
          sellMapMarker.setMap(sellMap);
        }
      });
    });
  }, [mapData]);

  return <div id="map_detail" style={{ width: "100%", height: "400px" }}></div>;
};

export default KakaoMap;
