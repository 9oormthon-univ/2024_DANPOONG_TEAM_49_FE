import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios 추가
import progressBarImage from '../images/progressBar2.png';
import backButtonImage from '../images/backButton.png';

const SignUpEmailCert = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isValid, setIsValid] = useState(false);  // 초기에 비활성화 상태로 설정

    // 입력값이 비어있지 않으면 버튼 색상 변경
    const handleInputChange = (e) => {
        const value = e.target.value;
        setCode(value);
        setIsValid(value.trim() !== '');  // 값이 비어있지 않으면 유효하도록 설정
    };

    // localStorage에서 이메일과 액세스 토큰 가져오기
    const email = localStorage.getItem('email');
    const accessToken = localStorage.getItem('accessToken');

    if (!email) {
        alert('이메일 정보가 없습니다. 다시 시도해주세요!');
        navigate('/signup/email');
    }

    if (!accessToken) {
        alert('로그인이 필요합니다.');
        navigate('/'); // 로그인 페이지로 리다이렉트
    }

    // 인증 코드 제출
    const handleVerifyCode = async () => {
        if (!isValid) return; // 유효한 입력이 아닐 경우

        try {
            // 서버로 보낼 데이터 설정
            const data = {
                email,
                authCode: code
            };

            // 서버에 POST 요청 보내기
            const response = await axios.post(
                'http://54.180.75.157:8080/api/auth/email/verify',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}` // Bearer 토큰 추가
                    }
                }
            );

            // 인증 성공 응답 처리
            if (response.data.success) {
                alert('인증 성공!');
                navigate('/signup/site');  // 인증 성공 시 '/signup/site' 페이지로 이동
            } else {
                alert('인증 코드가 일치하지 않습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error("인증 요청 실패:", error);
            alert('인증 코드 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
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
                    onClick={() => isValid && navigate('/signup/site')}  // 입력값이 있으면 이동
                    isValid={isValid}  // 유효성에 따라 스타일 변경
                >
                    다음  →
                </InputButton>
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
