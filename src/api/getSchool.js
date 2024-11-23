import axios from 'axios';

/**
 * 학교 정보를 가져오는 API 요청 함수
 * @param {number} latitude 위도
 * @param {number} longitude 경도
 * @returns {Promise<object>} 학교 정보 또는 에러 응답
 */

export const getSchool = async (latitude, longitude) => {
  try {
    console.log('요청 URL:', `http://54.180.75.157:8080/schools`);
    console.log('요청 파라미터:', { latitude, longitude });

    const response = await axios.get(`http://54.180.75.157:8080/schools`, {
      params: { latitude, longitude },
    });

    console.log('getSchool 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('getSchool 실패:', error.response?.data || error.message);
    throw error;
  }
};

