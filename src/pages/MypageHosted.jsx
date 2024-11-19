import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const MypageHosted = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/login')}>&lt;</BackButton>
                <h3>마이페이지</h3>
            </HeaderBar>

            <Container>
                
                
            </Container>
        </>
    );
};

export default MypageHosted;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    position: relative;
    border-bottom: 1px solid #FFFFFF;
`;

const BackButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
    position: absolute;
    left: 16px; 
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
