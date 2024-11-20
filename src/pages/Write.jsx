import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//icons
import {CiCamera} from "react-icons/ci";
const Write = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [productPhotos, setProductPhotos] = useState([]);
    const [link, setLink] = useState("");
    const [location, setLocation] = useState("");
    const [save, setSave] = useState("");
  
    const navigate = useNavigate();
    const goToHome = () => {
      navigate("/home");
    };
  
    const isFormComplete = () => {
      return title && price && productPhotos && link && location && save;
    };
  
    const handlePhotoChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0 && productPhotos.length + files.length <= 3) {
        setProductPhotos([...productPhotos, ...files].slice(0, 3)); // 최대 3개까지만 저장
      }
    };
  
    const fetchWrite = () => {
      // API 호출 코드
    };
  
    return (
      <>
        <HeaderBar>
            <div className='HeadGroup'>
                <button className="backBtn" onClick={goToHome}>
                    <img src='/assets/header_back.svg' alt='뒤로가기'/>
                </button>
                <span>공동구매 진행하기</span>
            </div>
        </HeaderBar>
        <Container>
          <PhotoContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
              id="product-photo"
              multiple
            />
            <label className="photoLabel" htmlFor="product-photo">
              {productPhotos.length > 0 ? (
                productPhotos.map((photo, index) => (
                  <img
                    className="preview"
                    key={index}
                    src={URL.createObjectURL(photo)} // 미리보기를 위한 URL 생성
                    alt={`Selected product ${index + 1}`}
                  />
                ))
              ) : (
                <PlusIcon>
                  <CiCamera />
                </PlusIcon>
              )}
            </label>
          </PhotoContainer>
  
          <InputGroup>
            <label>제목</label>
            <input
              type="text"
              placeholder="멋진 제목을 입력해주세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={title ? "filled" : ""}
            />
          </InputGroup>
          <InputGroup>
            <label>가격</label>
            <input
              type="text"
              placeholder="매력적인 가격을 입력해주세요."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={price ? "filled" : ""}
            />
          </InputGroup>
          <InputGroup>
            <label>구매 링크</label>
            <input
              type="text"
              placeholder="매력적인 가격을 입력해주세요."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={link ? "filled" : ""}
            />
          </InputGroup>
          <InputGroup>
            <label>픽업 장소</label>
            <input
              type="text"
              placeholder="매력적인 가격을 입력해주세요."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={location ? "filled" : ""}
            />
          </InputGroup>
          <FormRow>
            <FormGroup>
              <label>모집 개수</label>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </FormGroup>
            <FormGroup>
              <label>내가 구매하는 개수</label>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </FormGroup>
          </FormRow>
          <InputGroup>
            <label>개당 절약 금액</label>
            <input
              type="text"
              placeholder="여기에 절약 금액이 표시되요."
              value={save}
              onChange={(e) => setSave(e.target.value)}
              className={save ? "filled" : ""}
            />
          </InputGroup>
  
          <SubmitButton
            className={isFormComplete() ? "active" : ""}
            disabled={!isFormComplete()}
            onClick={fetchWrite}
          >
            {isFormComplete() ? "공동구매 등록하기" : "내용을 모두 입력해주세요!"}
          </SubmitButton>
        </Container>
      </>
 );
};

  export default Write;
  
  export const Container = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  `;
  
  const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .HeadGroup {
    display: flex;
    align-items: center;
    margin-left: 10px;
    gap: 7px; /* 버튼과 span 사이 간격 */
  }

  button {
    font-size: 48px; /* 버튼의 폰트 크기 */
    background: none;
    border: none;
    cursor: pointer;
  }

  span {
    font-size: 16px; /* 텍스트의 폰트 크기 */
  }
`;
  
  const PhotoContainer = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 20px;
  
    .photoLabel {
      width: 60px;
      height: 60px;
      background-color: transparent;
      border: 1px solid black;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      overflow: hidden;
  
      .preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  `;
  
  const PlusIcon = styled.span`
    font-size: 50px;
    color: black;
  `;
  
  const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  
    label {
      font-size: 15px;
      margin-bottom: 8px;
      font-weight: bold;
    }
  
    input,
    select {
      width: 100%;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      font-size: 15px;
      box-sizing: border-box;
      transition: border-color 0.3s ease;
  
      &.filled {
        border-color: var(--color-main);
      }
  
      &::placeholder {
        color: #cccccc;
      }
    }
  `;
  
  const FormRow = styled.div`
  display: flex;
  gap: 10px; /* 두 요소 간 간격 */
  justify-content: space-between;
  margin-bottom: 20px;

  > div {
    flex: 1; /* 두 요소가 동일한 너비를 가짐 */
  }
  `
  
  const FormGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%; /* 부모 요소에서 가로 공간을 차지 */
  gap: 10px;

  label {
    font-size: 12px; /* label 폰트 크기 */
    white-space: nowrap; /* 텍스트가 줄바꿈되지 않도록 설정 */
  }

  select {
    width: 80px; /* select 요소의 고정 너비 */
    padding: 8px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }

  /* 남은 공간을 여백으로 남기기 */
  & > :not(select) {
    flex: 1;
  }
`;
  
  const SubmitButton = styled.button`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 40px);
    max-width: 440px;
    padding: 15px;
    background-color: #f2f2f2;
    color: black;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    cursor: not-allowed;
    transition: background-color 0.3s ease, color 0.3s ease;
  
    &.active {
      background-color: var(--color-main);
      color: white;
      cursor: pointer;
    }
  `;
  