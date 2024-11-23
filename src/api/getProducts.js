import axios from 'axios';
export const getProducts = async () => {
  try {
    const response = await axios.get(`http://54.180.75.157:8080/products/recent`, 
        // body, 
        {
            headers: {
            "Content-Type": "application/json",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getProducts 성공');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
