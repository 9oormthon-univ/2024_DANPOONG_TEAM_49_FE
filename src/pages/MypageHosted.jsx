import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backButtonImage from '../images/backButton.png';
import productImage from '../images/product.png';

const MypageHosted = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('hosted');

    // 임시로 4개의 박스 데이터를 생성
    const boxes = [
        { name: '삼다수 500ml', price: '449원', priceInfo: '개당 961원 절약', quantity: '40개 중 6개 남음', img: productImage, isClosed: false },
        { name: '삼다수 500ml', price: '449원', priceInfo: '개당 961원 절약', quantity: '40개 중 6개 남음', img: productImage, isClosed: true },
        { name: '삼다수 500ml', price: '449원', priceInfo: '개당 961원 절약', quantity: '40개 중 6개 남음', img: productImage, isClosed: false },
        { name: '삼다수 500ml', price: '449원', priceInfo: '개당 961원 절약', quantity: '40개 중 6개 남음', img: productImage, isClosed: true }
    ];
        
    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/home')} />
                <Title>마이페이지</Title>
            </HeaderBar>
            <Container>
                <Nav>
                    <SubtitleButton1
                        isSelected={selected === 'hosted'}
                        onClick={() => {
                            setSelected('hosted');
                            navigate('/mypage/hosted');
                        }}
                    >
                        주최한 구매
                    </SubtitleButton1>
                    <SubtitleButton2
                        isSelected={selected === 'joined'}
                        onClick={() => {
                            setSelected('joined');
                            navigate('/mypage/joined');
                        }}
                    >
                        참여한 구매
                    </SubtitleButton2>
                </Nav>
                <Contents>
                    {boxes.map((box, index) => (
                        <Box key={index} isClosed={box.isClosed}>
                            {box.isClosed && <ClosedOverlay>마감</ClosedOverlay>}
                            <BoxImg src={box.img} alt={box.name} />
                            <BoxDetails>
                                <BoxName>{box.name}</BoxName>
                                <BoxPrice>{box.price}</BoxPrice>
                                <BoxPriceInfo>{box.priceInfo}</BoxPriceInfo>
                                <BoxQuantity>{box.quantity}</BoxQuantity>
                            </BoxDetails>
                        </Box>
                    ))}
                </Contents>
            </Container>
        </>
    );
};

export default MypageHosted;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    padding: 0 16px;
    position: relative;
    align-items: center;
`;

const BackButton = styled.button`
    width: 32px;
    height: 32px;
    background: url(${backButtonImage}) no-repeat center center;
    background-size: contain;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 11px;
`;

const Title = styled.h3`
    font-size: 16px;
    margin: 0;
    color: black;
    position: absolute;
    left: 164px;
`;

const SubtitleButton1 = styled.button`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.isSelected ? 'black' : '#949494')};
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
    margin-right: 35px;
`;

const SubtitleButton2 = styled.button`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.isSelected ? 'black' : '#949494')};
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
    margin-left: 35px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Nav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    background-color: #F7F7F7;
    border: 1px solid #ddd;
    padding: 16px;
    margin: 10px 0;
    width: 90%;
    height: 180px;
    max-width: 600px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    opacity: ${(props) => (props.isClosed ? 0.5 : 1)};
    pointer-events: ${(props) => (props.isClosed ? 'none' : 'auto')};
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #aaa #f7f7f7;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #aaa;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
        background-color: #f7f7f7;
    }
`;

const ClosedOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5); 
    color: white;
    font-size: 16px;
    border-radius: 8px;
    z-index: 1; 
`;

const BoxImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 4px;
    margin-right: 50px;
`;

const BoxDetails = styled.div`
    display: flex;
    flex-direction: column;
`;

const BoxName = styled.h4`
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 8px;
    color: black;
`;

const BoxPrice = styled.h4`
    font-size: 20px;
    font-weight: bold;
    color: red;
    margin: 0 0 8px;
`;

const BoxPriceInfo = styled.p`
    font-size: 12px;
    color: black;
    margin: 0 0 8px;
    margin-bottom: 40px;
`;

const BoxQuantity = styled.button`
    font-size: 13px;
    color: black;
    margin: 0;
    background-color: #f1f1f1;
    border: 1px solid black;
    border-radius: 16px;
`;
