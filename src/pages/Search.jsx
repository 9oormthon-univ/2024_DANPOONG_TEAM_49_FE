import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SellingItem from "../components/SellingItem";
import mockPostData from "../components/mockPostData";

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [tags, setTags] = useState(["삼다수", "다우니", "휴지", "청소포"]);

  const navigate = useNavigate();

  // 뒤로가기
  const goBack = () => {
    navigate("/");
  };

  // 태그 삭제 기능
  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  // 모든 태그 삭제 기능
  const handleDeleteAllTags = () => {
    setTags([]);
  };

  return (
    <Container>
      <InputGroup>
        <img
          src="/assets/back_arrow.svg"
          alt="goBack"
          className="back-arrow"
          onClick={goBack}
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
        />
      </InputGroup>

      {/* 검색어가 없는 경우 태그 영역 표시 */}
      {!searchValue && (
        <>
          <TagHeader>
            <span className="recent-label">최근 검색어</span>
            <button className="delete-all" onClick={handleDeleteAllTags}>
              모두 삭제
            </button>
          </TagHeader>
          <TagWrapper>
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button
                  className="deleteBtn"
                  onClick={() => handleDeleteTag(tag)}
                >
                  X
                </button>
              </div>
            ))}
          </TagWrapper>
        </>
      )}
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
  margin-bottom: 40px;

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

  .back-arrow {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 14px;
  }
`;

const TagHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;

  .recent-label {
    font-size: 14px;
    font-weight: bold;
    color: #949494;
  }

  .delete-all {
    font-size: 14px;
    color: #949494;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #333;
    }
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

  .tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    height: 26px;
    border-radius: 12px;
    border: 1px solid #949494;
    color: #949494;
    font-size: 12px;

    .deleteBtn {
      margin-left: 6px;
      font-size: 12px;
      color:#949494;
      background: none;
      border: none;
      cursor: pointer;

      &:hover {
        color: #ff0000;
      }
    }
  }
`;

const AuctionItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* 아이템 간 간격 */
  width: 100%;
  padding-right:20px; /* 양쪽 여백 */
  box-sizing: border-box;
`;
