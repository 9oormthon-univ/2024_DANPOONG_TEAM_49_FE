import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container } from './Write';

const Login = () => {
    // navigate
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };

    return (
        <>
            <Container>
            <h1>기숙상점</h1>
                <ImageButton
                    src="path/to/signup-image.jpg"
                    alt="3초 바로 회원가입"
                />
                <ImageButton
                    src="path/to/kakao-login-image.jpg"
                    alt="카카오 로그인"
                />s
            </Container>
        </>
    );
};

export default Login;


const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    background-color: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ccc;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
`;

const ImageButton = styled.img`
    width: 200px;
    height: auto;
    margin: 10px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 8px;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;
