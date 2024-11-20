import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '../images/kakao.png';

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
                    <SignupButton onClick={goToMain}>
                        3초 바로 회원가입 ⚡
                    </SignupButton>
                    <KakaoButton
                        src={kakaoImage}
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
`;

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 30px;
    color: #AF3400;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const SignupButton = styled.button`
    width: 173px;
    height: 37px;
    color: black;
    border: none;
    border-radius: 8px;
    font-size: 12px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
`;

const KakaoButton = styled.img`
    width: 300px;
    height: 45px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;
