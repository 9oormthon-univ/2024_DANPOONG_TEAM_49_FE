import React from 'react';
import { Container } from './Write';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mockPostData from '../components/mockPostData';

const Post = () => {
    //navigate
    const navigate=useNavigate();
    const goToMain=()=>{
        navigate("/");
    }

    return (
        <>
            <HeaderBar>
                <button className='backBtn' onClick={goToMain}>&lt;</button>
                <img src='말풍선' alt='말풍선'/>
            </HeaderBar>
            <BigPhoto src='' alt='상품 사진'/>
            <Container>
                <ProductSection>
                    <span className='productName'>{mockPostData.title}</span>
                    <span className='productPrice'>{mockPostData.price}</span>
                    <span className='remainAmount'>{mockPostData.total}개중 {mockPostData.remain}개 남음</span>
                    <span className='platform'>구매처 : {mockPostData.flatform}</span>
                </ProductSection>

                <PriceSection>

                </PriceSection>

                <ParticipantSection>

                </ParticipantSection>
            </Container>
        </>
    );
};

export default Post;

const HeaderBar=styled.div`
    width:100%;
    height:56px;
    border-bottom:1px solid black;
    display: flex;
    margin-bottom:20px;
    justify-content:space-between;
    span{
        font-size:16px;
    }
`
const BigPhoto=styled.img`
    width:350px;
    height: 350px;
`

const ProductSection=styled.div`
    width:100%;
    border-bottom:1px solid black;
`

const PriceSection=styled.div`
    
`
const ParticipantSection=styled.div`
    
`