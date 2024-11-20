import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar1.png';
import backButtonImage from '../images/backButton.png'; 

const SignUpEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));
    };

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/login')} />
                <ProgressBar src={progressBarImage} alt="Progress Bar" />
            </HeaderBar>
            <Container>
                <Title>학교 인증</Title>
                <Subtitle>학교 이메일을 입력해주세요</Subtitle>
                <InputField
                    type="text"
                    placeholder="학교 이메일 입력"
                    value={email}
                    onChange={handleInputChange}
                />
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => isValid && navigate('/signup/email-cert')}
                    isValid={isValid}
                />
            </Container>
        </>
    );
};

export default SignUpEmail;

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

const InputField = styled.input`
    width: 314px;
    height: 47px;
    font-size: 16px;
    color: black;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding-left: 12px;
    transition: background-color 0.3s ease;
`;

const InputButton = styled.input`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${(props) => (props.isValid ? '#AF3400' : '#C36E49')};
    color: white;
    border: none;
    border-radius: 16px;
    cursor: ${(props) => (props.isValid ? 'pointer' : 'not-allowed')};
    transition: background-color 0.3s ease;
`;
