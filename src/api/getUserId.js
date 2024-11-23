import axios from 'axios';
import Cookies from 'js-cookie';
export const getUserId = async () => {
  const accessToken = Cookies.get('accessToken');
  try {
    const response = await axios.get(`http://54.180.75.157:8080/api/auth/token`, 
        // body, 
        {
            headers: {
            "Content-Type": "*/*",
              "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getUserId 성공');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
