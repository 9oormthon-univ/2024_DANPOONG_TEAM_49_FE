import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import mockPostData from '../components/mockPostData';
import { Container } from './Write';

const Post = () => {
    const { id } = useParams(); // URL의 id를 가져옴
    const navigate = useNavigate();

    // mockPostData에서 id에 해당하는 데이터 찾기
    const product = mockPostData.find((item) => item.id === parseInt(id));

    const goToMain = () => {
        navigate("/");
    };

    if (!product) {
        return <div>상품 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <HeaderBar>
                <button className="backBtn" onClick={goToMain}>
                    &lt;
                </button>
                <img src="/images/chatIcon.png" alt="말풍선" />
            </HeaderBar>
            <BigPhoto src="/images/product-placeholder.png" alt="상품 사진" />
            <Container>
                <ProductSection>
                    <span className="productName">{product.title}</span>
                    <span className="productPrice">개당 {product.price}원</span>
                    <span className="remainAmount">
                        총 {product.total}개 중 {product.remain}개 남음
                    </span>
                    <span className="platform">구매처: {product.platform}</span>
                </ProductSection>
                <PriceSection>
                    <span>결제 금액: {product.price * product.remain}원</span>
                </PriceSection>
                <ParticipantSection>
                    <h4>참여자</h4>
                    <ul>
                        <li>홍길동 2개</li>
                        <li>김철수 1개</li>
                    </ul>
                </ParticipantSection>
            </Container>
        </>
    );
};

export default Post;

// 스타일 정의
const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-bottom: 20px;

    .backBtn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }

    img {
        width: 24px;
        height: 24px;
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
    padding: 16px;
    border-bottom: 1px solid black;

    .productName {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
        display: block;
    }

    .productPrice {
        color: red;
        font-size: 16px;
        margin-bottom: 8px;
        display: block;
    }

    .remainAmount {
        font-size: 14px;
        margin-bottom: 8px;
        display: block;
    }

    .platform {
        font-size: 14px;
        color: gray;
    }
`;

const PriceSection = styled.div`
    padding: 16px;
    font-size: 16px;
    border-bottom: 1px solid black;
`;

const ParticipantSection = styled.div`
    padding: 16px;

    h4 {
        font-size: 16px;
        margin-bottom: 8px;
    }

    ul {
        list-style: none;
        padding: 0;

        li {
            font-size: 14px;
            margin-bottom: 4px;
        }
    }
`;
