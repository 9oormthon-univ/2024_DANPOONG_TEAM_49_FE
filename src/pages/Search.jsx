import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SellingItem from "../components/SellingItem";
import mockPostData from "../components/mockPostData";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  // const [category, setCategory] = useState("");
  // const [startPrice, setStartPrice] = useState("");
  // const [productPhotos, setProductPhotos] = useState([]); // 최대 3장까지 선택 가능
  // const [productInfo, setProductInfo] = useState("");

  const navigate = useNavigate();

  const mockTagData=[
    {
      tag:"삼다수"
    },
    {
      tag:"다우니"
    },
    {
      tag:"휴지"
    },
    {
      tag:"청소포"
    },
  ]

  const goBack = () => {
    navigate("/");
  };

  return (
    <Container>

      <InputGroup>
        <img src="/assets/back_arrow.svg" alt="goBack" className="back-arrow" onClick={goBack}/>
        <input
        type="text"
        className="search-input"
        placeholder="원하는 물품을 검색해보세요!"
        onChange={(e) => setSearchValue(e.target.value)}
        />
        <img src="/assets/search_icon.svg" alt="search" className="search-icon" />
      </InputGroup>
      {/* {!searchValue&& */}
      <TagWrapper>
        {mockTagData.map((tag)=>{
          <div className="tag">
            <button className="deleteBtn">X</button>
            {tag}
          </div>
        })}
      </TagWrapper>
      {/* } */}
      {searchValue&&
      <AuctionItemWrapper>
      {mockPostData.map((auction) => (
        <SellingItem auction={auction} />
      ))}
    </AuctionItemWrapper>}
      
    </Container>
  );
}

export default Search;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 30px;
  font-family: "Pretendard", sans-serif;
  box-sizing: border-box;

  .search-container {
  width: calc(100vw - 60px); 

  height: 52px;
  padding: 16px 14px;
  background-color: #fbfffc;
  border-radius: 8px; /* 둥근 모서리 추가 가능 */
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 살짝 그림자 */
  margin-top: 69px;
  
}

.search-input {
  flex-grow: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 16px;
  color: #333; /* 텍스트 색상 */
}

.search-input::placeholder {
  color: #999;
}

.search-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.back-arrow{
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left:14px;
}
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
  border: 1px solid var(--color-main);
  height:24px;
  border-radius:16px;

  input,
  select,
  textarea {
    padding: 12px;
    padding-right: 40px; /* 아이콘 공간 확보를 위해 오른쪽 패딩 추가 */
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    width: 100%;

    &.filled {
      border-color: var(--color-main);
    }

    &::placeholder {
      color: #cccccc;
    }
  }

  textarea {
    height: 220px;
  }

  select {
    height: 51px;
  }

  .subLabel {
    margin: 2px 0px 10px 0px;
    font-size: 12px;
    color: black;
    text-align: left;
  }

  .search-icon {
    position: absolute;
    right: 18px; /* input의 오른쪽에서 18px */
    top: 50%;
    transform: translateY(-50%); /* 상하 중앙 정렬 */
    width: 20px;
    height: 20px;
  }
`;

const TagWrapper = styled.div`
  width:100%;
  display:flex;
  .tag{
    height:26px;
    border-radius:12px;
    border:0.1px solid #000000;
    color:#D9D9D9;
    font-size:12px;
  }
`

const AuctionItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
