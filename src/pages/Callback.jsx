import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function RedirectKakaoPage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get('code');  // URL에서 'code' 파라미터 추출
    const grantType = 'authorization_code';
    const REST_API_KEY = 'cdd423a129bb50b1413fa39e3a72e142';  // 카카오 앱의 REST API 키
    const REDIRECT_URI = 'http://localhost:3000/callback';  // 리다이렉트 URI

    // URLSearchParams를 사용하여 폼 데이터 만들기
    const formData = new URLSearchParams();
    formData.append('grant_type', grantType);
    formData.append('client_id', REST_API_KEY);
    formData.append('redirect_uri', REDIRECT_URI);
    formData.append('code', code);

    // 카카오 토큰 요청 URL
    const link = 'https://kauth.kakao.com/oauth/token';

    // 액세스 토큰 요청
    axios
      .post(link, formData.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', // 폼 URL 인코딩
        },
      })
      .then((res) => {
        console.log('액세스 토큰:', res.data);
        // 액세스 토큰을 받아 사용자 정보 조회
        const accessToken = res.data.access_token;
        Cookies.set('accessToken', accessToken, { expires: 1 });
        getUserInfo(accessToken);
      })
      .catch((error) => {
        console.error('토큰 발급 실패:', error.response ? error.response.data : error);
        setError('토큰 발급에 실패했습니다.');
      });
  }, []);

  // 사용자 정보 조회
  const getUserInfo = (accessToken) => {
    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data);
        // 사용자 정보를 받아온 후 다음 페이지로 이동
        navigate('/home', { state: { userInfo: res.data } });
      })
      .catch((error) => {
        console.error('사용자 정보 조회 실패:', error.response ? error.response.data : error);
        setError('사용자 정보 조회에 실패했습니다.');
      });
  };

  return (
    <div>
      <h1>카카오 로그인 리다이렉트 페이지</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userInfo ? (
        <div>
          <h2>환영합니다, {userInfo.properties.nickname}님!</h2>
          <img src={userInfo.properties.profile_image} alt="Profile" />
        </div>
      ) : (
        <p>사용자 정보를 로딩 중...</p>
      )}
    </div>
  );
}

export default RedirectKakaoPage;
