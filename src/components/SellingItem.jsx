// SellingItem.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SellingItem = ({ auction }) => {
  const navigate = useNavigate();
  const goToDoneDetail=()=>{
    navigate(`/done/${auction.id}`);
  }
  return (
    <AuctionItem onClick={goToDoneDetail}>
      <img src={auction.img[0]} alt={auction.title} className="auction-item-img" />
      <AuctionDetail>
        
        <h3 className="auction-item-title">{auction.title}</h3>
        <AuctionInfo>
          <p className="auction-item-price">{auction.price}원</p>
          <p className="auction-item-save">
            개당 <span className="highlight">{auction.save}원</span>을 절약
          </p>
            <div className="auction-item-remain">{auction.total}개 중<span className="highlight">{auction.remain}</span>개 남음</div>
        </AuctionInfo>
        
      </AuctionDetail>
    </AuctionItem>
  );
};

export default SellingItem;

/* SellingItem.css */
const AuctionItem=styled.div`
  width: 100%;
  display: flex;
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border:0.1px solid #D9D9D9;
  border-radius: 8px;
  height: 104px;
  .auction-item-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 4px;
}
`
const AuctionDetail=styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-between;
  width:100%;

  .action-item-slash {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 6px;
    height: 10px;
  }

  .auction-item-title {
  font-size: 16px;
  font-family: "Pretendard", sans-serif;
  font-weight: bold;
  line-height:1.2;
  height:28px;
  text-overflow:ellipsis;
  word-wrap:break-word;
}
`
const AuctionInfo=styled.div`
  display:flex;
  flex-direction:column;
  gap:4px;
  width: 100%;
  padding:4px 0;

  .auction-item-remain {
    width: 110px;
    max-width:160px;
    height: 20px;
    border: 0.3px solid black;
    font-size: 13px;
    font-family: "Pretendard", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    .highlight{
      font-weight:bold;
    }
  }

.auction-item-save {
  font-size: 12px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  .highlight{
    font-weight:700;
  }
}

.auction-item-price {
  font-size: 20px;
  color:var(--color-main);
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  margin:0;
}
`





