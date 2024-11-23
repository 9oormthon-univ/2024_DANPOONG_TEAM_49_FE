import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Autoplay, Pagination } from 'swiper/modules';
import { useLocation, useNavigate } from 'react-router-dom';
import mockPostData from "../components/mockPostData";
import { getProducts } from '../api/getProducts';
import { getMyProducts } from '../api/getMyProducts';
import Cookies from 'js-cookie';
import { postSaveUser } from '../api/postSaveUser';
import { getUserId } from '../api/getUserId';
import { useDispatch } from 'react-redux';
import { setKakaoId } from '../redux/kakaoSlice'; // 경로가 정확한지 확인



// 학교 이름을 가져오는 함수
export const getSchool = async (latitude, longitude) => {
  try {
    console.log(`요청 좌표: ${latitude}, ${longitude}`);
    const response = await axios.get(
      `http://54.180.75.157:8080/schools`,
      {
        params: { latitude, longitude },
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error('학교 데이터를 가져오는 중 에러가 발생했습니다:', error);
    throw error;
  }
};

const Home = () => {
  const location = useLocation(); // 전달받은 state를 읽음

  const [userInfo, setUserInfo] = useState(location.state?.userInfo || null);
  const [userId, setUserId] = useState("");
  const [school, setSchool] = useState("");
  const [products, setProducts] = useState([]); 
  const [myProducts, setMyProducts] = useState([]); 
  const [searchValue, setSearchValue] = useState(""); 
  const [token,setToken]=useState("");

  const dispatch = useDispatch(); // Redux dispatch 가져오기
  const navigate = useNavigate();
   const mockSwiper = [
    {
      id: 1,
      img: [
        "/assets/homeswiper/ad1.png",
        "/assets/homeswiper/ad2.jpg",
        "/assets/homeswiper/ad3.jpg",
      ],
    },
  ];


  const goToMyPage = () => {
    navigate("/mypage/joined");
  };

  const goToWrite = () => {
    navigate("/write");
  };

  const goToSearch = () => {
    navigate("/search");
  };

  const goToPost = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(()=>{
    const accessToken = Cookies.get('accessToken');
    setToken(accessToken);
    const fetchUserId = async () => {
      try {
          const userId = await getUserId();
          setUserId(userId);
          console.log("userId :",userId);
      } catch (error) {
          console.error("Error fetching user ID:", error);
      }
    };
    fetchUserId();
  },[])

  useEffect(()=>{
    postSaveUser(token);
  },[token])

  useEffect(() => {
    if (!userInfo) {
      console.log('사용자 정보 없음');
    } else {
      console.log('받아온 사용자 정보:', userInfo);
      dispatch(setKakaoId(userInfo.id)); // Redux에 userId 저장
    }

    const storedSchool = localStorage.getItem('school');
    const storedProducts = localStorage.getItem('products');
    const storedMyProducts = localStorage.getItem("myProducts");
    //school
    if (storedSchool) {
      setSchool(storedSchool);
    } else {
      const fetchSchool = async () => {
        try {
          const latitude = 37.5665;
          const longitude = 126.978;
          const schoolData = await axios.get(
            `http://54.180.75.157:8080/schools`,
            {
              params: { latitude, longitude },
              headers: { 'Content-Type': 'application/json' },
            }
          );
          setSchool(schoolData.data.name || '학교 이름 없음');
        } catch (error) {
          console.error('학교 데이터를 가져오는 데 실패했습니다:', error);
        }
      };
      fetchSchool();
    }
    //recent product
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      const fetchProducts = async () => {
        try {
          if(!products.length){
            const fetchedProducts = await getProducts(userInfo.id);
            console.log(fetchedProducts);
            if(fetchedProducts){
              setProducts(fetchedProducts);
              console.log("최신 상품 데이터 성공");
            }}
        } catch (error) {
          console.log('최신 상품 데이터 실패:', error);
        }
      };
      fetchProducts();
    }
    //my product
    if (storedMyProducts) {
      setMyProducts(storedMyProducts);
    } else {
      const fetchMyProducts = async () => {
        try {
          if(!products.length){
          const fetchedMyProducts = await getMyProducts(userInfo.id);
          console.log(fetchedMyProducts);
          if(fetchMyProducts){
            setMyProducts(fetchedMyProducts);
            console.log("My 상품 데이터 성공");
          }}
        } catch (error) {
          console.log("My 상품 데이터 실패");
          console.error(error);
        }
      };
      fetchMyProducts();
    }

  }, [userInfo]);

  return (
    <>
      <Container>
        <div className="topBar">
          <label className="mainTitle">{school} 기숙사</label>
          <img src="/assets/myPage.svg" onClick={goToMyPage} alt="마이페이지 버튼" />
        </div>
        <InputGroup>
          <img src="/assets/hamburger.svg" alt="goBack" className="hamburger" />
          <input
            type="text"
            className="search-input"
            placeholder="원하는 물품을 검색해보세요!"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <img
            src="/assets/search_icon.svg"
            alt="search"
            className="search-icon"
            onClick={goToSearch}
          />
        </InputGroup>
      </Container>
      <BigPhotoWrapper>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500, // 슬라이드 간 간격 (밀리초)
            disableOnInteraction: false, // 사용자 상호작용 후에도 autoplay 유지
          }}
        >
          {mockSwiper[0].img.map((image, index) => (
            <SwiperSlide key={index}>
              <BigPhoto src={image} alt={`상품 사진 ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </BigPhotoWrapper>
      <Container>
        <label className="mainTitle">진행중인 공동구매 <img src="/assets/header_front.svg" alt="arrow" /></label>
        <ProductGrid>
          {mockPostData.map((product, index) => (
            <ProductCard key={index} onClick={() => goToPost(index+1)}>
              <img src={product.img[0]} alt={`진행중인 상품 사진 ${index + 1}`} />
              <ProductInfo>
                <div className="product-name">{product.title}</div>
                <div className="product-price">
                  <span>1개당 </span>
                  <span className="price">{product.price}원</span>
                </div>
                <div className="participant">
                  참여 인원 : {product.total - product.remain}/{product.total}
                </div>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
        <label className="mainTitle">공동구매 <img src="/assets/header_front.svg" alt="arrow" /></label>
        <ProductGrid>
          {mockPostData.map((product, index) => (
            <ProductCard key={index} onClick={() => goToPost(index+1)}>
              <img src={product.img[0]} alt={`진행중인 상품 사진 ${index + 1}`} />
              <ProductInfo>
                <div className="product-name">{product.title}</div>
                <div className="product-price">
                  <span>1개당 </span>
                  <span className="price">{product.price}원</span>
                </div>
                <div className="participant">
                  참여 인원 : {product.total - product.remain}/{product.total}
                </div>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
        <WriteButton onClick={goToWrite}>
          <img src="/assets/writePencil.svg" alt="글쓰기 아이콘" />
          <span>글쓰기</span>
        </WriteButton>
      </Container>
    </>
  );
};


export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 0px;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  .topBar{
    width:100%;
    display:flex;
    justify-content:space-between;
    img{
        margin-bottom:16px;
    }
  }
  .mainTitle{
        font-size:20px;
        font-weight:500;
        margin-bottom:20px;
    }
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid var(--color-main);
  border-radius: 16px;
  height: 52px;
  padding: 0 16px;
  box-sizing: border-box;
  margin-bottom:20px;

  .search-input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    color: #333;
  }

  .search-input::placeholder {
    color: #999;
  }

  .search-icon {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .hamburger {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 14px;
  }
`;

const BigPhotoWrapper = styled.div`
    max-width:400px;
    text-align: center;
    margin-bottom: 20px;
    .swiper-pagination {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        display: flex;
        justify-content: center;
        gap: 6px; /* 도트 사이 간격 */
    }

    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background-color: #ccc;
        border-radius: 50%;
        margin: 0 4px;
        opacity: 1;
        border:1px solid black;
    }

    .swiper-pagination-bullet-active {
        background-color: var(--color-main);
    }

    .saveMessage {
        display: block;
        margin-top: 20px;
        font-size: 14px;
        .highlight {
            font-weight: bold;
        }
    }
`;

const BigPhoto = styled.img`
    width:100vw;
    height: 216px;
    display: block;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: calc((100% - (3 * 100px)) / 2);
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
  box-sizing: border-box;
`;




const ProductCard = styled.div`
    display:flex;
    flex-direction:column;
    align-items:left;
    width:100px;
    img{
        width:100px;
        height:100px;
        border-radius:12px;
        object-fit:contain;
        margin-bottom:8px;
    }
`

const ProductInfo = styled.div`
    text-align:left;
    .product-name{
        font-size:8px;
        font-weight:500;
        margin-bottom:3px;
    }
    .product-price{
        font-size:12px;
        font-weight:700;
        color:var(--color-main);
        margin-bottom:4px;
    }
    .participant{
        font-size:8px;
        color:#949494;
    }
`

const WriteButton = styled.button`
    width:77px;
    height:39px;
    padding:12px 10px;
    background-color:var(--color-main);
    color:white;
    position:fixed;
    display:flex;
    justify-content:center;
    bottom:10px;
    right:10px;
    border-radius:30px;
    line-height:1.2;
    img{
        margin-right:4px;
    }
`