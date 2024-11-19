import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // navigate
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };

    return (
        <>
            <Container>
                <Title>기숙상점</Title>
                <ButtonWrapper>
                    <ImageButton
                        src="path/to/signup-image.jpg"
                        alt="3초 바로 회원가입"
                    />
                    <ImageButton
                        src="path/to/kakao-login-image.jpg"
                        alt="카카오 로그인"
                    />
                </ButtonWrapper>
            </Container>
        </>
    );
};

export default Login;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const ImageButton = styled.img`
    width: 200px;
    height: auto;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
