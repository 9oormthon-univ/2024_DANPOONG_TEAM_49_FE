import axios from 'axios';
import Cookies from "js-cookie";
export const SocialLogin = async () => {
  try {
    const accessToken = Cookies.get("accessToken");


    const response = await axios.post('https://api-url', {
        body: {
            "test": "aa"
        }
    }, {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` //인증
        },
    });
    console.log('api 작동 성공');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
  return response.data;
};
