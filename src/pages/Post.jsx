import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mockPostData from '../components/mockPostData';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Post = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = mockPostData.find((item) => item.id === parseInt(id));

    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const goToMain = () => {
        navigate('/');
    };

    if (!product) {
        return <div>상품 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <HeaderBar>
                <div className="HeadGroup">
                    <button className="backBtn" onClick={goToMain}>
                        <img src="/assets/header_back.svg" alt="뒤로가기" />
                    </button>
                    <span>공동구매 진행하기</span>
                </div>
            </HeaderBar>
            <BigPhotoWrapper>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    loop={true}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => `
                            <span class="${className}"></span>
                        `,
                    }}
                >
                    {product.img.map((image, index) => (
                    <SwiperSlide key={index}>
                        <BigPhoto src={image} alt={`상품 사진 ${index + 1}`} />
                    </SwiperSlide>
                ))}
                </Swiper>
                <span className="saveMessage">
                    개당 <span className="highlight">{product.save}</span>원을 절약할 수 있어요.
                </span>
            </BigPhotoWrapper>

            <Container>
                <ProductSection>
                <div className="productRow">
                    <span className="productPrice">개당 {product.price}원</span>
                    <span className="auction-item-remain">
                        총 {product.total}개 중 <span className="highlight">{product.remain}</span>개 남음
                    </span>
                </div>
                <span className="platform">구매처: {product.platform}</span>
                </ProductSection>
                <PriceSection>
                    <QuantityControl>
                        <button onClick={handleDecrease}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </QuantityControl>
                    <span className="totalPrice">
                        결제 금액: {product.price * quantity}원
                    </span>
                </PriceSection>
                <ParticipantSection>
                    <div className="hostSection">
                        <h4>주최자</h4>
                        <ul>
                            <li>
                                <Dot type="host" />
                                홍길동 2개
                            </li>
                        </ul>
                    </div>
                    <div className="participantSection">
                        <h4>참여자</h4>
                        <ul>
                            <li>
                                <Dot type="participant" />
                                김철수 1개
                            </li>
                        </ul>
                    </div>
                </ParticipantSection>
                <SubmitButton onClick={goToMain}>예약하기</SubmitButton>
            </Container>
        </>
    );
};

export default Post;
const Container = styled.div`
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    margin: 0;
`;

// 스타일 정의
const HeaderBar = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 10px;

    .HeadGroup {
        display: flex;
        align-items: center;
        margin-left: 10px;
        gap: 7px; /* 버튼과 span 사이 간격 */
    }

    button {
        font-size: 32px; /* 버튼의 폰트 크기 */
        background: none;
        border: none;
        cursor: pointer;
    }

    span {
        font-size: 16px; /* 텍스트의 폰트 크기 */
        line-height: 40px; /* 높이 맞춤 */
    }
`;

const BigPhotoWrapper = styled.div`
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
        gap: 8px; /* 도트 사이 간격 */
    }

    .swiper-pagination-bullet {
        width: 8px;
        height: 8px;
        background-color: #ccc;
        border-radius: 50%;
        margin: 0 4px;
        opacity: 1;
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
    width: 100%;
    max-width: 350px;
    height: auto;
    display: block;
    margin: 0 auto;
`;

const ProductSection = styled.div`
    width: 100%;
    border-bottom: 1px solid black;
    padding: 0 20px 16px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px; /* 요소 간 간격 설정 */

    .productName {
        font-size: 18px;
        font-weight: bold;
    }

    .productRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .productPrice {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .auction-item-remain {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        padding: 0 8px; /* 좌우 패딩 */
        height: 20px;
        border: 0.3px solid black;
        font-size: 13px;
        font-family: "Pretendard", sans-serif;
        border-radius: 10px;
        gap: 4px; /* 텍스트와 강조 부분 사이 간격 */

        .highlight {
            font-weight: bold;
            margin-left: 2px; /* '중' 뒤 여백 */
        }
    }

    .platform {
        font-size: 14px;
        color: gray;
    }
`;


const PriceSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    font-size: 16px;

    .totalPrice {
        font-weight: bold;
    }

    border-bottom: none;
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    button {
        width: 24px;
        height: 24px;
        border: 1px solid #ccc;
        background-color: #fff;
        cursor: pointer;
        text-align: center;
        line-height: 24px;
        font-size: 16px;
        font-weight: bold;
    }

    span {
        font-size: 16px;
        font-weight: bold;
    }
`;

const ParticipantSection = styled.div`
    padding: 16px;

    .hostSection,
    .participantSection {
        margin-bottom: 20px; /* 상하 여백 추가 */
    }

    h4 {
        font-size: 16px;
        margin-bottom: 8px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-bottom: 4px;

            &:before {
                content: '';
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 16px;
            }
        }
    }
`;

const Dot = styled.span`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 16px;

    background-color: ${(props) =>
        props.type === 'host' ? 'var(--color-main)' : 'transparent'};
    border: ${(props) =>
        props.type === 'participant' ? '1px solid var(--color-main)' : 'none'};
`;
const SubmitButton = styled.button`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 440px;
    padding: 15px;
    background-color: var(--color-main);
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    font-size: 20px;
  `;