import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Comment = () => {      
    const mockData = [
        { id: 1, author: '홍길동 (주최자)', content: '안녕하세요. 저희 2개만 더 예약받고 진행할게요.', timestamp: '11.13 03:23', isMine: false },
        { id: 2, author: '김OO (참가자)', content: '넵 알겠습니다~!!', timestamp: '11.13 05:12', isMine: false },
        { id: 3, author: '이OO (참가자)', content: '넵 좋습니다~~', timestamp: '11.13 03:23', isMine: false },
    ];

    const [comments, setComments] = useState(mockData);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
  
    const handleSend = () => {
      if (!inputValue.trim()) return; // 빈 입력 방지
      const newComment = {
        id: comments.length + 1,
        author: '나',
        content: inputValue,
        timestamp: new Date().toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        isMine: true,
      };
      setComments([...comments, newComment]);
      setInputValue('');
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
                <CommentList>
                    {comments.map((comment) => (
                    <CommentBubble key={comment.id} isMine={comment.isMine}>
                        <Author isMine={comment.isMine}>{comment.author}</Author>
                        <Content>{comment.content}</Content>
                        <Timestamp>{comment.timestamp}</Timestamp>
                    </CommentBubble>
                    ))}
                </CommentList>
                <InputContainer>
                    <Input
                    type="text"
                    placeholder="댓글을 입력하세요..."
                    value={inputValue}
                    onChange={handleInputChange}
                    />
                    <SendButton onClick={handleSend}>&rarr;</SendButton>
                </InputContainer>
            </Container>
        </>
    );
};

export default Comment;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 20px 30px;
  font-family: "Pretendard", sans-serif;
  box-sizing: border-box;
`;


const HeaderBar = styled.div`
width: 100%;
height: 56px;
border-bottom: 1px solid var(--color-main);
display: flex;
align-items: center;
box-sizing: border-box;

.HeadGroup {
  width:100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  gap: 7px;
  position:relative;
}

button {
  font-size: 48px; /* 버튼의 폰트 크기 */
  background: none;
  border: none;
  cursor: pointer;
  position:absolute;
  left:0;
}

span {
  font-size: 16px; /* 텍스트의 폰트 크기 */
}
`;

const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
`;


const CommentBubble = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
  margin: 5px 0;
`;


const Author = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
  color: ${(props) => (props.isMine ? '#007aff' : '#333')};
`;


const Content = styled.div`
  background-color: ${(props) => (props.isMine ? '#daf8e3' : '#f1f1f1')};
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
`;


const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #666;
  margin-top: 5px;
`;


const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding: 10px;
`;


const Input = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 10px;
  font-size: 1rem;
  outline: none;
`;


const SendButton = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  outline: none;


  &:hover {
    background-color: #005bb5;
  }
`;