import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar2.svg';

const SignUpSite = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signUpEmail')}>&lt;</BackButton>
            </HeaderBar>
            <Container>
                <h1>위치 인증</h1>
                <h5>위치를 확인중입니다</h5>
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

