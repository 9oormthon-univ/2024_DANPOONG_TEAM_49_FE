import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '../images/kakao.png';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    // 카카오 SDK 로드
    useEffect(() => {
        if (!window.Kakao) {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.onload = () => {
                window.Kakao.init('4b1593cd10be7af1b435d6974e7be1e2');  // 카카오 JavaScript 키로 초기화
            };
            document.head.appendChild(script);
        } else {
            window.Kakao.init('4b1593cd10be7af1b435d6974e7be1e2');
        }
    }, []);

    // 카카오 로그인 API 호출
    const handleKakaoLogin = () => {
        if (window.Kakao) {
            window.Kakao.Auth.login({
                success: (authObj) => {
                    console.log('카카오 로그인 성공:', authObj);
                    // 로그인 성공 후 리다이렉트 URI로 이동
                    const redirectUri = encodeURIComponent('http://localhost:3000/oauth/callback/kakao');
                    const clientId = '74751890e9fcf5f8ee5f8eead62f512e';  // 카카오 앱의 REST API 키
                    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
                },
                fail: (err) => {
                    console.error('로그인 실패:', err);
                },
            });
        } else {
            console.log('카카오 SDK 로딩 실패');
        }
    };

    // 인증 코드로 액세스 토큰 요청 및 사용자 정보 가져오기
    const fetchAccessToken = async (code) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/code/kakao',
                { code: code },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const accessToken = response.data.access_token;
            // 액세스 토큰으로 사용자 정보 가져오기
            const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('사용자 정보:', userInfoResponse.data);
            // 서버에 사용자 존재 여부 확인 요청
            checkUserStatus(userInfoResponse.data, navigate);
        } catch (error) {
            console.error('로그인 실패:', error);
        }
    };

    // 서버에 사용자 존재 여부 확인 요청
    const checkUserStatus = async (userInfo, navigate) => {
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/check-user',
                { kakaoId: userInfo.id },  // 카카오 사용자 ID로 서버에 요청
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.exists) {
                // 기존 사용자라면 'home' 페이지로 리디렉션
                navigate('/home');
            } else {
                // 새로운 사용자라면 'signup/email' 페이지로 리디렉션
                navigate('/signup/email');
            }
        } catch (error) {
            console.error('사용자 상태 확인 오류:', error.response ? error.response.data : error);
        }
    };

    // URL에서 인증 코드 추출
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            // 인증 코드가 있으면 액세스 토큰을 요청
            fetchAccessToken(code);
        }
    }, []); // 컴포넌트 마운트 시에만 실행

    return (
        <Container>
            <Title>기숙상점</Title>
            <ButtonWrapper>
                <SignupButton>3초 바로 회원가입 ⚡</SignupButton>
                <KakaoButton
                    src={kakaoImage}
                    alt="카카오 로그인"
                    onClick={handleKakaoLogin}  // 로그인 버튼 클릭 시 카카오 로그인 호출
                />
            </ButtonWrapper>
        </Container>
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
