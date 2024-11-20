import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar3.png';
import mapImage from '../images/map.png';
import backButtonImage from '../images/backButton.png'; 

const SignUpSiteConfirm = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/site')} />
                <ProgressBar src={progressBarImage} alt="Progress Bar" />
            </HeaderBar>
            <Container>
                <MapImage src={mapImage} alt="Map Image" /> {/* map 이미지를 Title 위에 추가 */}
                <Title>위치 인증</Title>
                <Subtitle>해당 위치가 알맞은가요?</Subtitle>
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => navigate('/signup/success')}
                />
            </Container>
        </>
    );
};

export default SignUpSiteConfirm;

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

const MapImage = styled.img`
    width: 300px;
    height: auto;
    margin-bottom: 30px;
`;
