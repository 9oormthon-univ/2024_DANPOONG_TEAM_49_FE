import React, { useState } from 'react';
import styled from 'styled-components';
import mockPostData from '../components/mockPostData';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const school="가톨릭대학교";
    const mockSwiper=[{
        id:1,
        img: [
            "/assets/post/1.png",
            "/assets/post/2.png",
            "/assets/post/3.png",
        ],
    }]

    const navigate=useNavigate();
    const goToMyPage=()=>{
        navigate("/mypage")
    }
    const goToWrite=()=>{
        navigate("/write")
    }
    const goToSearch=()=>{
        console.log(searchValue);
        navigate("/search")
    }
    const goToPost=(id)=>{
        navigate(`/post/${id}`)
    }
    return (
        <>
            <Container>
                <div className='topBar'>
                    <label className='mainTitle'>{school} 기숙사</label>
                    <img src='/assets/myPage.svg' onClick={goToMyPage} alt='마이페이지 버튼'/>
                </div>
                <InputGroup>
                    <img
                    src="/assets/hamburger.svg"
                    alt="goBack"
                    className="hamburger"
                    />
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
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        pagination={true}
                        modules={[Pagination]}
                    >
                        {mockSwiper[0].img.map((image, index) => (
                        <SwiperSlide key={index}>
                            <BigPhoto src={image} alt={`상품 사진 ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                    </Swiper>
                </BigPhotoWrapper>
            <Container>
                <label className='mainTitle'>진행중인 공동구매 <img src='/assets/header_front.svg' alt='arrow'/></label>
                <ProductGrid>
                    {mockPostData.map((product,index)=>(
                        <ProductCard key={index} onClick={() => goToPost(product.id)}>
                            <img src={product.img[0]} alt={`진행중인 상품 사진 ${index + 1}`}/>
                            <ProductInfo>
                                <div className='product-name'>{product.title}</div>
                                <div className='product-price'>
                                    <span>1개당 </span>
                                    <span className='price'>{product.price}원</span>
                                </div>
                                <div className='participant'>참여 인원 : {product.total - product.remain}/{product.total}</div>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </ProductGrid>
                <label className='mainTitle'>공동구매 <img src='/assets/header_front.svg' alt='arrow'/></label>
                <ProductGrid>
                    {mockPostData.map((product,index)=>(
                        <ProductCard key={index} >
                            <img src={product.img[0]} alt={`진행중인 상품 사진 ${index + 1}`}/>
                            <ProductInfo>
                                <div className='product-name'>{product.title}</div>
                                <div className='product-price'>
                                    <span>1개당 </span>
                                    <span className='price'>{product.price}원</span>
                                </div>
                                <div className='participant'>참여 인원 : {product.total - product.remain}/{product.total}</div>
                            </ProductInfo>
                        </ProductCard>
                    ))}
                </ProductGrid>
                <WriteButton onClick={goToWrite}>
                    <img src='/assets/writePencil.svg' alt='글쓰기 아이콘'/>
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
    width: 216px;
    max-width: 350px;
    height: 216px;
    display: block;
    margin: 0 auto;
`;

const ProductGrid = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:30px; //padding 고려 꽉채우게 얘가 가변적이어야함.
    margin-bottom:20px;
`

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