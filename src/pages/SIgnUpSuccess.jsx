import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar4.png';
import checkmarkImage from '../images/checkmark.png';

const SignUpSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar />
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
            <Container>
                <CheckMark />
                <Title>회원가입 완료</Title>
                <Subtitle>이제부터 공동구매해주세요</Subtitle>
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => navigate('/home')} // 메인 페이지로 이동
                />
            </Container>
        </>
    );
};

export default SignUpSuccess;

const fadeInScale = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.5);
    }
    50% {
        opacity: 0.5;
        transform: scale(1.2);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    align-items: center;
    padding: 0 16px;
    position: relative;
`;

const ProgressBar = styled.img`
    width: 402px;
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

const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h5`
    font-size: 16px;
    margin-bottom: 40px;
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

const CheckMark = styled.div`
    width: 80px;
    height: 80px;
    background: url(${checkmarkImage}) no-repeat center center;
    background-size: contain;
    animation: ${fadeInScale} 1s ease-out;
    margin-bottom: 20px;
`;
