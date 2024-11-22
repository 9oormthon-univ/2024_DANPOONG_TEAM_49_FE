import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import progressBarImage from "../images/progressBar3.png";
import backButtonImage from "../images/backButton.png";
import { getSchool } from "../api/getSchool";

const SignUpSiteConfirm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 지도 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=4b1593cd10be7af1b435d6974e7be1e2&autoload=false";
    script.async = true;

    script.onload = () => {
      // 카카오 지도 로드
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map"); // 지도를 표시할 div
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.56647, 126.97741), // 초기 중심 좌표
          level: 6, // 지도 확대 레벨
          mapTypeId: window.kakao.maps.MapTypeId.ROADMAP, // 지도 타입
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도 생성

        // 지도 확대/축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 드래그 가능한 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.56682, 126.97865), // 초기 마커 위치
          draggable: true, // 드래그 가능 설정
          map: map, // 마커를 표시할 지도
        });

        window.kakao.maps.event.addListener(marker, "dragend", async () => {
          const position = marker.getPosition();
          const latitude = position.getLat();
          const longitude = position.getLng();
          console.log("새 위치:", latitude, longitude);
        
          try {
            // 서버에 좌표를 전송하고 학교 정보 요청
            const data = await getSchool(latitude, longitude);
            alert(`학교 정보: ${data.school}`);
        
            // 학교 정보를 로컬 저장소에 저장
            localStorage.setItem("school", data.school);
          } catch (error) {
            if (error.response?.data?.code === "SCHOOL_NOT_FOUND") {
              alert("위치를 다시 설정하세요!");
            } else {
              alert("요청에 실패했습니다. 다시 시도하세요!");
            }
          }
        });         
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <HeaderBar>
        <BackButton onClick={() => navigate("/signup/email-cert")} />
      </HeaderBar>
      <ProgressBar src={progressBarImage} alt="Progress Bar" />
      <Container>
        <Map id="map"></Map>
        <Title>위치 인증</Title>
        <Subtitle>해당 위치가 알맞은가요?</Subtitle>
        <InputButton
          type="button"
          value="다음  →"
          onClick={() => navigate("/signup/success")}
        />
      </Container>
    </>
  );
};

export default SignUpSiteConfirm;

const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  position: relative;
`;

const BackButton = styled.button`
  width: 48px;
  height: 48px;
  background: url(${backButtonImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
  margin: 1px 1px 1px;
`;

const ProgressBar = styled.img`
  width: 100%;
  height: 12px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h5`
  font-size: 16px;
  margin-bottom: 40px;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 56px);
  background-color: #f9f9f9;
`;

const InputButton = styled.input`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #af3400;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const Map = styled.div`
  width: 300px;
  height: 360px;
  margin-top: 63px;
  margin-bottom: 30px;
`;
