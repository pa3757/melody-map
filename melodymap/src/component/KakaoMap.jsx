// KakaoMap.jsx
import React, { useState, useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
const { kakao } = window;

const KakaoMap = ({ keyword }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (!map || !keyword) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  const handleMarkerClick = (marker) => {
    setClickCount((prevCount) => {
      if (prevCount === 1) {
        const { lat, lng } = marker.position;
        const content = marker.content;
        const url = `https://map.kakao.com/?q=${encodeURIComponent(
          content
        )}&map_type=TYPE_MAP&from=place&fromidx=0&reload=false&query=${encodeURIComponent(
          content
        )}&center=${lng},${lat}&radius=5000&LEVEL=3`;
        window.open(url, "_blank");
        return 0;
      } else {
        setInfo(marker);
        return prevCount + 1;
      }
    });
  };

  return (
    <Map
      center={{ lat: 37.566826, lng: 126.9786567 }}
      style={{ width: "100%", height: "350px" }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker, index) => (
        <MapMarker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        >
          {info && info.content === marker.content && (
            <div style={{ color: "#000" }}>{marker.content}</div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
};

export default KakaoMap;
