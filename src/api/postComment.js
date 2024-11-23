import axios from 'axios';


export const postComment = async (productId,comment) => {
  try {
    const response = await axios.post(`http://54.180.75.157:8080/comments/${productId}/createComment`, 
        {
            body: {
                "content" : comment,
            }
        },
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('postComment 성공');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
