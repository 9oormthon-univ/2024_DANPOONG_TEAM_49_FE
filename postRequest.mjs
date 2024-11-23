import axios from 'axios';

const email = '';
const authCode = '123456';
const token = 'your_access_token_here';

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
