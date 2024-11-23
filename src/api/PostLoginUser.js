import axios from 'axios';

/**
 * 카카오 인증 코드로 액세스 토큰을 요청하는 함수
 * @param {string} code 카카오 로그인 후 받은 인증 코드
 * @returns {Promise<object>} 액세스 토큰 및 사용자 정보 또는 에러 응답
 */
export const getAccessToken = async (code) => {
    try {
        console.log('요청 URL:', 'http://localhost:3000/api/auth/code/kakao');
        console.log('요청 파라미터:', { code: code });

        const response = await axios.post(
            'http://localhost:3000/api/auth/code/kakao',
            { code: code },  // 인증 코드를 그대로 JSON 형식으로 보내기
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

/**
 * 액세스 토큰을 사용하여 카카오 사용자 정보를 가져오는 함수
 * @param {string} accessToken 액세스 토큰
 * @returns {Promise<object>} 사용자 정보 또는 에러 응답
 */
export const getUserInfo = async (accessToken) => {
    try {
        console.log('요청 URL:', 'https://kapi.kakao.com/v2/user/me');
        const response = await axios.get(
            'https://kapi.kakao.com/v2/user/me',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 Authorization 헤더에 추가
                },
            }
        );

        console.log('User Info:', response.data);
        return response.data; // 사용자 정보를 반환
    } catch (error) {
        console.error('Error while fetching user info:', error.response ? error.response.data : error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있게 함
    }
};