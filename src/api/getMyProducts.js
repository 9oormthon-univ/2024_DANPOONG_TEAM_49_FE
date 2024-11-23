import axios from 'axios';
export const getMyProducts = async (id) => {
  try {
    const response = await axios.get(`http://54.180.75.157:8080/products/${id}/recent`, 
        // body, 
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getMyProducts 성공');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
