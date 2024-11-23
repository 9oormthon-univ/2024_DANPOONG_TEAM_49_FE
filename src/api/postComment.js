import axios from 'axios';
export const postComment = async (productId,comment,token) => {
  try {
    console.log("gained token :",token);
    const response = await axios.post(`http://54.180.75.157:8080/comments/${productId}/createComment`, 
        {
            body: {
                "content" : comment,
            }
        },
        {
            headers: {
            "Content-Type": "*/*",
            "Authorization": `Bearer ${token}`
            },
        }
);
    console.log('postComment 성공');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
