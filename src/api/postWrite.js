import axios from 'axios';
export const postWrite = async (userId) => {
  try {
    const response = await axios.post(`http://54.180.75.157:8080/products/${userId}/leadCreate`, 
        {
            body: {
                "product_id": 1,
                "title": "Sample Product",
                "total_num": 100,
                "quantity": 10,   
                "price": 20000,  
                "save_price": 5000,
                "pickup_location": "기숙사 1층 택배수령실",
                "img": "주소",
                // https://www.example.com/water”,
            }
        },
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('postWrite 성공');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
