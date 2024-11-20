import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar5.svg';

const SignUpSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/site-confirm')}>&lt;</BackButton>
            </HeaderBar>
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
            <Container>
                <Title>회원가입 완료</Title>
                <Subtitle>이제부터 공동구매해주세요</Subtitle>
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => navigate('/main')} // 메인 페이지로 이동
                />
            </Container>
        </>
    );
};

export default SignUpSuccess;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    align-items: center;
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
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
`;

const ProgressBar = styled.img`
    width: 100%; /* 화면 너비 전체 */
    height: 12px; /* 고정된 높이 */
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
