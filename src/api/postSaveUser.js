import axios from 'axios';
import Cookies from 'js-cookie';
export const postSaveUser = async (token) => {
  const accessToken = Cookies.get('accessToken');
  if(accessToken){
    try {
        console.log("saveuser gained token :",accessToken);
        const response = await axios.post(`http://54.180.75.157:8080/api/auth/token/save`,
            null,
            {
                headers: {
                "Authorization": `Bearer ${accessToken}`
                },
            }
    );
        console.log('postSaveUser 성공');
        console.log(response);
      } catch (error) {
        console.error("postSaveUser 에러",error);
      }
  }
};
