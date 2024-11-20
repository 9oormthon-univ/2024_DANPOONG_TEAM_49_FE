import React, { useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import titleLogo from '../images/titlelogo.png';
import logoImage from '../images/splashlogo.png';
import lineImage from '../images/logoline.png';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container>
            <Title>
                <img src={titleLogo} alt="기숙상점" />
            </Title>
            <Subtitle1>다양한 공동구매를 진행해보세요!</Subtitle1>
            <Subtitle2>
                오늘부터 기숙상점
                <img src={lineImage} alt="로고 라인" />
            </Subtitle2>
            <Footer>Copyright 기숙상점. All rights reserved</Footer>
            <LogoImage />
        </Container>
    );
};

export default Splash;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 20px;
    position: relative;
    height: 100vh;
    overflow: hidden;
    animation: ${fadeIn} 2s ease-out;
`;

const Title = styled.div`
    margin-top: 40px;
    img {
        width: 108px;
        height: 30px;
    }
`;

const Subtitle1 = styled.h5`
    font-size: 12px;
    margin-top: 15px;
`;

const Subtitle2 = styled.h5`
    font-size: 16px;
    margin-top: 10px;
    color: #AF3400;
    img {
        width: 88px;
        height: auto;
        margin-left: 5px;
        margin-bottom: 5px;
    }
`;

const LogoImage = styled.div`
    position: absolute;
    margin-top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 1150px;
    height: 1150px;
    background-image: url(${logoImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    animation: fadeInBackground 3s ease-out, slideUp 3s ease-out;
`;

const Footer = styled.h5`
    font-size: 12px;
    margin-top: 670px;
    text-align: center;
    width: 100%;
`;