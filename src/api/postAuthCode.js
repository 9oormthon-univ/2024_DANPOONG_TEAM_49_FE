import axios from 'axios';

const email = '2ne1jenna@naver.com';
const authCode = 'UGNFCL83';
const token = 'b9ma1caV9hmWI4Vpalsm1JVfMcP5JcNjAAAAAQorDNIAAAGTWXJr2q-b-4epDDEo'; // 서버에서 받은 인증 토큰을 여기에 넣으세요

const data = {
  email: email,
  authCode: authCode
};

axios.post('http://54.180.75.157:8080/api/auth/email/verify', data, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Bearer 토큰 추가
  }
})
  .then(response => {
    console.log('서버 응답:', response.data);
  })
  .catch(error => {
    console.error('오류 발생:', error.response?.data || error.message);
  });
