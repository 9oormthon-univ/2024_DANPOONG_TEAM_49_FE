import axios from 'axios';
import Cookies from 'js-cookie';
export const postComment = async (productId,comment,token) => {
  try {
    const accessToken = Cookies.get('accessToken');
    console.log(comment);
    const response = await axios.post(`http://54.180.75.157:8080/comments/1/createComment`, 
        {
            body: {
                "comment":"하이",
                "kakaoId":"3804417635"
            }
        },
        {
            headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('postComment 성공');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
