import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar2.svg';

const SignUpSite = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // 예제: 3초 후 로딩 완료로 전환
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/signup/site-confirm'); // 다음 페이지로 이동
        }, 3000); // 3초 동안 로딩

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/email-cert')}>&lt;</BackButton>
            </HeaderBar>
            <Container>
                <Title>위치 인증</Title>
                <Subtitle>위치를 확인중입니다</Subtitle>
                {loading && (
                    <LoaderWrapper>
                        <Loader />
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
    align-items: center;
    padding: 0 16px;
    position: relative;
    background: url(${progressBarImage}) no-repeat center bottom;
    background-size: 100% 12px;
    object-fit: cover;
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
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
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

// 로딩 애니메이션 키프레임
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// 로딩 애니메이션 스타일
const Loader = styled.div`
    width: 50px;
    height: 50px;
    border: 6px solid #ccc;
    border-top: 6px solid #AF3400;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;

// 로딩 래퍼 스타일
const LoaderWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
