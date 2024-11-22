import axios from 'axios';
export const getRecentProduct = async () => {
  try {
    const response = await axios.get(`http://54.180.75.157:8080/products/recent`, 
        // body, 
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getRecentProduct 성공');
    console.log(response.data);
    return response.data.comments;
  } catch (error) {
    console.error(error);
  }
};
