import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import progressBarImage from '../images/progressBar2.png';
import backButtonImage from '../images/backButton.png';

const SignUpEmailCert = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isValid, setIsValid] = useState(true);

    // sessionStorage에서 이메일 가져오기
    const email = sessionStorage.getItem('email');
    if (!email) {
        alert('이메일 정보가 없습니다. 다시 시도해주세요!');
        navigate('/signup/email');
    }

    // localStorage에서 카카오 액세스 토큰 가져오기
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('로그인이 필요합니다.');
        navigate('/login'); // 로그인 페이지로 리다이렉트
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCode(value);
        setIsValid(value.trim() !== '');
    };

    const handleVerifyCode = async () => {
        if (!isValid) return;

        try {
            const response = await axios.post(
                'http://54.180.75.157:8080/api/auth/email/verify',
                { email, authCode: code },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // 액세스 토큰을 헤더에 추가
                    }
                }
            );

            if (response.data === '인증 성공') {
                alert('인증 코드 확인 완료!');
                navigate('/signup/site');
            } else {
                alert('인증 실패: ' + response.data);
            }
        } catch (error) {
            console.error('인증 실패:', error.response?.data || error.message);
            alert('인증 코드 확인 실패ㅠ.ㅠ 다시 시도하세요!');
        }
    };

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signup/email')} />
            </HeaderBar>
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
            <Container>
                <Title>인증 코드 입력</Title>
                <Subtitle>발송된 인증 코드를 입력해주세요</Subtitle>
                <InputField
                    type="text"
                    placeholder="인증 코드 입력"
                    value={code}
                    onChange={handleInputChange}
                />
                <InputButton
                    type="button"
                    value="다음 →"
                    onClick={handleVerifyCode}
                    isValid={isValid}
                />
            </Container>
        </>
    );
};

export default SignUpEmailCert;

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
    margin: 1px 1px 1px;
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
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding-left: 12px;
    transition: background-color 0.3s ease;
`;

const InputButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: ${(props) => (props.isValid ? '#AF3400' : '#C36E49')};
    color: white;
    border: none;
    border-radius: 16px;
    cursor: ${(props) => (props.isValid ? 'pointer' : 'not-allowed')};
    transition: background-color 0.3s ease;
    display: inline-block;
`;
