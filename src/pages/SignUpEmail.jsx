import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import progressBarImage from '../images/progressBar1.png';
import backButtonImage from '../images/backButton.png';

const SignUpEmail = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // 이메일 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));
    };

    const handleSendEmail = async () => {
        if (!isValid || isLoading) return;

        try {
            setIsLoading(true);

            await axios.post(
                'http://54.180.75.157:8080/api/auth/email',
                { email },
                { headers: { 'Content-Type': 'application/json' } }
            );

            alert('인증 코드 전송 완료!');
            sessionStorage.setItem('email', email); // 이메일 저장
            navigate('/signup/email-cert');
        } catch (error) {
            console.error('인증 코드 전송 실패:', error.response?.data || error.message);
            alert('인증 코드 전송 실패ㅠ.ㅠ 다시 시도하세요!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/login')} />
            </HeaderBar>
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
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
                    value="다음 →"
                    onClick={handleSendEmail} // 서버에 이메일 전송
                    isValid={isValid && !isLoading} // 유효하고 로딩 중이 아닐 때 활성화
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
    align-items: center;
    padding: 0 16px;
    position: relative;
`;

const BackButton = styled.button`
    width: 48px;
    height: 48px;
    background: url(${backButtonImage}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
`;

const ProgressBar = styled.img`
    width: 100%;
    height: 12px;
`;

const Title = styled.h1`
    font-size: 28px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h5`
    font-size: 16px;
    margin-bottom: 40px;
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
    padding-left: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
