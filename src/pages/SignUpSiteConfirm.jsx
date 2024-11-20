import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar3.png';
import backButtonImage from '../images/backButton.png';

const SignUpSiteConfirm = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Kakao Map API를 비동기적으로 로드
        const script = document.createElement('script');
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=4b1593cd10be7af1b435d6974e7be1e2&autoload=false";
        script.async = true;
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 위치 설정
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);
            });
        };
        document.body.appendChild(script);

        // Clean up: remove script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/email-cert')} />
            </HeaderBar>
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
            <Container>
                <Map id="map"></Map>
                <Title>위치 인증</Title>
                <Subtitle>해당 위치가 알맞은가요?</Subtitle>
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => navigate('/signup/success')}
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
    background-color: #AF3400;
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
