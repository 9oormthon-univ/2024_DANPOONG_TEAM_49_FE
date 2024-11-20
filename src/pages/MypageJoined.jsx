import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '../images/backButton.png'; 

const MypageJoined = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/login')} />
                <Title>마이페이지</Title>
            </HeaderBar>

            <Container>
            </Container>
        </>
    );
};

export default MypageJoined;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 16px;
    position: relative;
    align-items: center;
    position: relative;
`;

const BackButton = styled.button`
    width: 32px;
    height: 32px;
    background: url(${backButtonImage}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 11px;
`;

const Title = styled.h3`
    font-size: 16px;
    margin: 0;
    color: black;
    position: absolute;
    left: 164px;
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
