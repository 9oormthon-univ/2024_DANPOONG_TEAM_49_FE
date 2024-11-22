import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import kakaoImage from '../images/kakao.png';

const Login = () => {
    const navigate = useNavigate();

    // 카카오 로그인 API 호출
    const handleKakaoLogin = () => {
        // 카카오 SDK 초기화 (발급받은 JavaScript 키 사용)
        if (window.Kakao) {
            window.Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY');  // 발급받은 JavaScript 키 넣기

            // 카카오 로그인
            window.Kakao.Auth.login({
                success: (authObj) => {
                    // 로그인 성공 시 사용자 정보 받아오기
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success: (res) => {
                            console.log(res);  // 로그인한 사용자 정보
                            navigate('/home');  // 로그인 후 홈으로 이동
                        },
                        fail: (error) => {
                            console.error(error);
                        }
                    });
                },
                fail: (err) => {
                    console.error(err);
                }
            });
        } else {
            console.log("카카오 SDK 로딩 실패");
        }
    };

    return (
        <Container>
            <Title>기숙상점</Title>
            <ButtonWrapper>
                <SignupButton>
                    3초 바로 회원가입 ⚡
                </SignupButton>
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
