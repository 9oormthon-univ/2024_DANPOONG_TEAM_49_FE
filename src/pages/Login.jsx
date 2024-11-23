import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
//image
import kakaoImage from '../images/kakao.png';
import titleImage from '../images/기숙상점.png';
import titleLogo from '../images/titlelogo.png';
import logoImage from '../images/splashlogo.png';
import lineImage from '../images/logoline.png';
import axios from 'axios';


    const Login = () => {
        const navigate = useNavigate();
        const [splash, setSplash] = useState(true); // Splash 상태
        const [fadeOut, setFadeOut] = useState(false); // Fade-out 애니메이션 상태

        useEffect(() => {
            // 2초 후 fade-out 시작
            const fadeOutTimer = setTimeout(() => {
                setFadeOut(true);
            }, 2000);

            // 3초 후 SplashContainer 제거
            const splashRemoveTimer = setTimeout(() => {
                setSplash(false);
            }, 3000);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(splashRemoveTimer);
            };
        }, []);
    
        // 카카오 SDK 로드
        useEffect(() => {
            if (!window.Kakao) {
                const script = document.createElement('script');
                script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
                script.onload = () => {
                    window.Kakao.init('e13dfac4a9bd1c73f137f741ae63a703');  // 카카오 JavaScript 키로 초기화
                };
                document.head.appendChild(script);
            } else {
                window.Kakao.init('e13dfac4a9bd1c73f137f741ae63a703');
            }
        }, []);
    
        // 카카오 로그인 API 호출
        const handleKakaoLogin = () => {
            if (window.Kakao) {
                window.Kakao.Auth.login({
                    success: (authObj) => {
                        console.log('카카오 로그인 성공:', authObj);
                        // 로그인 성공 후 리다이렉트 URI로 이동
                        const redirectUri = encodeURIComponent('https://danpoong-team-49.netlify.app/callback');
                        const clientId = 'cdd423a129bb50b1413fa39e3a72e142';  // 카카오 앱의 REST API 키
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
    
        // 인증 코드로 액세스 토큰 요청
        const getAccessToken = async (code) => {
            try {
                console.log('요청 URL:', 'http://54.180.75.157:8080/api/auth/code/kakao');
                console.log('요청 파라미터:', { code: code });
    
                const response = await axios.post(
                    'http://54.180.75.157:8080/api/auth/code/kakao',
                    { code: new URL(window.location.href).searchParams.get("code") },  // 인증 코드를 JSON 형식으로 보내기
                    
                    {
                        headers: { 'Content-Type': 'application/json' },  // JSON 형식으로 전송
                    }
                );
    
                console.log('Access Token:', response.data);
                return response.data.access_token;  // 액세스 토큰 반환
            } catch (error) {
                console.error('Error while requesting access token:', error.response ? error.response.data : error);
                throw error;
            }
        };
    
        // 사용자 정보 조회
        const getUserInfo = async (accessToken) => {
            try {
                console.log('액세스 토큰을 이용한 사용자 정보 요청');
    
                const response = await axios.get(
                    'http://54.180.75.157:8080/api/auth/token',
                    {
                        headers: { 'Authorization': `Bearer ${accessToken}` }  // 액세스 토큰을 헤더에 넣어 전달
                    }
                );
    
                console.log('User Info:', response.data);
                return response.data;  // 사용자 정보 반환
            } catch (error) {
                console.error('Error while fetching user info:', error.response ? error.response.data : error);
                throw error;
            }
        };
    
        // 사용자 정보 저장
        const saveUserInfo = async (userInfo, accessToken) => {
            try {
                console.log('사용자 정보 저장 요청');
    
                const response = await axios.post(
                    'http://54.180.75.157:8080/api/auth/token/save',
                    {
                        access_token: accessToken,  // 액세스 토큰
                        user_info: userInfo,  // 사용자 정보
                    },
                    {
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
    
                console.log('사용자 정보 저장 성공:', response.data);
                return response.data;  // 성공 메시지 반환
            } catch (error) {
                console.error('Error while saving user info:', error.response ? error.response.data : error);
                throw error;
            }
        };
    
        // URL에서 인증 코드 추출 후 액세스 토큰, 사용자 정보 저장
        useEffect(() => {
            const params = new URLSearchParams(window.location.search); // URL에서 쿼리 스트링 파싱
            const code = params.get('code');  // URL에서 'code' 파라미터 추출
    
            if (code) {
                console.log('인증 코드:', code);  // 인증 코드 출력
    
                // 인증 코드가 있으면 액세스 토큰을 요청
                getAccessToken(code)
                    .then((accessToken) => {
                        console.log('받은 액세스 토큰:', accessToken);
                        // 액세스 토큰으로 사용자 정보 조회
                        return getUserInfo(accessToken);
                    })
                    .then((userInfo) => {
                        console.log('사용자 정보:', userInfo);
                        // 사용자 정보 저장
                        return saveUserInfo(userInfo, userInfo.access_token);
                    })
                    .then((response) => {
                        console.log('사용자 정보 저장 완료:', response);
                        navigate('/home');  // 홈 화면으로 이동
                    })
                    .catch((error) => {
                        console.error('문제가 발생했습니다:', error);
                    });
            } else {
                console.log('인증 코드가 없습니다.');
            }
        }, []);  // 컴포넌트 마운트 시에만 실행

        return (
            <>
                {splash && (
                    <SplashContainer fadeOut={fadeOut}>
                        <TitleGroup>
                            <div className='splashTitle'>
                                <img src={titleLogo} alt="기숙상점" />
                            </div>
                            <h5 className='subtitle1'>다양한 공동구매를 진행해보세요!</h5>
                            <h5 className='subtitle2'>
                                오늘부터 기숙상점
                                <img src={lineImage} alt="로고 라인" />
                            </h5>
                        </TitleGroup>
                        <Footer>Copyright 기숙상점. All rights reserved</Footer>
                        <LogoImage />
                    </SplashContainer>
                )}
                <Container>
                    <Title src={titleImage} alt="기숙상점" />
                    <ButtonWrapper>
                        <SignupButton>3초 바로 회원가입 ⚡</SignupButton>
                        <KakaoButton
                            src={kakaoImage}
                            alt="카카오 로그인"
                            onClick={handleKakaoLogin}
                        />
                    </ButtonWrapper>
                </Container>
            </>
        );
};

export default Login;

const fadeOutAnimation = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

// SplashContainer 스타일
const SplashContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white; /* 배경색 */
    z-index: 999; /* 가장 상단에 표시 */
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${({ fadeOut }) => (fadeOut ? fadeOutAnimation : 'none')} 1s ease-out forwards;
`;

const TitleGroup = styled.div`
    position:absolute;
    top:0;
    left:24px;
    .splashTitle{
        margin-top: 48px;
        img {
            width: 108px;
            height: 30px;
        }
    }

    .subtitle1{
        font-size: 12px;
        margin-top: 15px;
    }
    .subtitle2{
        font-size: 16px;
        margin-top: 10px;
        color: #AF3400;
        img {
            width: 88px;
            height: auto;
            margin-left: 5px;
            margin-bottom: 5px;
        }
    }
`

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


//login
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    z-index:1;
`;

const Title = styled.img`
    margin-bottom: 50px;
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
    margin-bottom: 30px;
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