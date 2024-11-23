import axios from 'axios';

export const getMypageHosted = async (user_id) => {
  try {
    const response = await axios.get(`http://54.180.75.157:8080//products/${user_id}/lead`, 
        // body, 
        {
            headers: {
            "Content-Type": "*/*",
            //   "Authorization": `Bearer ${accessToken}`
            },
        }
);
    console.log('getMypageHosted 성공!');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
