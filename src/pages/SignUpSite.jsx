import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar3.png';
import loading1 from '../images/loadingBar1.png';
import loading2 from '../images/loadingBar2.png';
import loading3 from '../images/loadingBar3.png'; 
import backButtonImage from '../images/backButton.png';

const SignUpSite = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(loading1); // 초기 이미지를 loading1으로 설정
    const [imageIndex, setImageIndex] = useState(0); // 이미지 순차 변경을 위한 인덱스

    // 이미지 순환 배열
    const loadingImages = [loading1, loading2, loading3];

    useEffect(() => {
        // 이미지 순환을 위한 타이머
        const imageTimer = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % loadingImages.length); // 순차적으로 이미지 변경
        }, 500); // 0.5초마다 이미지 변경

        // 페이지 이동을 3초 뒤에 수행
        const loadingTimer = setTimeout(() => {
            navigate('/signup/site-confirm'); // 3초 뒤에 성공 페이지로 이동
        }, 3000);

        return () => {
            clearInterval(imageTimer); // 이미지 타이머 정리
            clearTimeout(loadingTimer); // 로딩 타이머 정리
        };
    }, [navigate]);

    useEffect(() => {
        setCurrentImage(loadingImages[imageIndex]); // currentImage를 imageIndex에 맞춰 업데이트

        // 모든 이미지가 출력된 후에 로딩 상태를 false로 설정
        if (imageIndex === loadingImages.length - 1) {
            setLoading(false); // 3개의 이미지가 모두 출력되면 로딩 완료로 상태 변경
        }
    }, [imageIndex]);

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/email-cert')} />
                <ProgressBar src={progressBarImage} alt="Progress Bar" />
            </HeaderBar>
            <Container>
                <Title>위치 인증</Title>
                <Subtitle>위치를 확인중입니다</Subtitle>
                {loading && (
                    <LoaderWrapper>
                        <LoadingImage src={currentImage} alt="로딩 중" />
                    </LoaderWrapper>
                )}
            </Container>
        </>
    );
};

export default SignUpSite;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 16px;
    position: relative;
`;

const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h5`
    font-size: 16px;
    margin-bottom: 40px;
`;

const BackButton = styled.button`
    width: 48px;
    height: 48px;
    background: url(${backButtonImage}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    margin-top: 10px; 
`;

const ProgressBar = styled.img`
    width: 100%;
    height: 12px;
`;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    background-color: #f9f9f9;
`;

const LoaderWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingImage = styled.img`
    width: 266px;
    height: 73px;
`;
