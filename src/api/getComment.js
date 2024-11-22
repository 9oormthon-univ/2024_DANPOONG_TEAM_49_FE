import axios from 'axios';
export const getComment = async (productId) => {
  try {
    const response = await axios.get(`http://54.180.75.157:8080/comments/${productId}`, 
        // body, 
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getComment 성공');
    console.log(response.data.comments);
    return response.data.comments;
  } catch (error) {
    console.error(error);
  }
};
