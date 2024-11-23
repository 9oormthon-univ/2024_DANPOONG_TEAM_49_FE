import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getComment } from "../api/getComment";
import { postComment } from "../api/postComment";
import Cookies from 'js-cookie';

const Comment = () => {
  const { id } = useParams();
  const [comment,setComment]=useState([]);
  const [token,setToken]=useState("");
  // const [comments, setComments] = useState(mockData);
  const [inputValue, setInputValue] = useState("");

  useEffect(()=>{
    const accessToken = Cookies.get('accessToken');
    setToken(accessToken);
    console.log("accessToken :", token);
  },[])

  const mockData = [
    { id: 1, author: "홍길동 (주최자)", content: "안녕하세요. 저희 2개만 더 예약받고 진행할게요.", timestamp: "11.13 03:23", isMine: false },
    { id: 2, author: "김OO (참가자)", content: "넵 알겠습니다~!!", timestamp: "11.13 05:12", isMine: false },
    { id: 3, author: "이OO (참가자)", content: "넵 좋습니다~~", timestamp: "11.13 03:23", isMine: false },
  ];

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComment(id);
      console.log(data);
      if (data) {
        const formattedData = data.map((item) => ({
          id: item.comment_id, // comment_id -> id
          author: item.username, // username -> author
          content: item.content, // 그대로
          timestamp: new Date(item.createdAt).toLocaleString("ko-KR", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }), // createdAt -> timestamp
          isMine: false, // API 데이터는 기본적으로 내 댓글이 아님
        }));
        setComment(formattedData); // 변환된 데이터 설정
      }
    };
    fetchComments();
  }, [id]);
  
  useEffect(() => {
  console.log("댓글 상태가 업데이트되었습니다:", comment);
  }, [comment]);


  const navigate = useNavigate();
  const goToHome = () => {
    navigate(`/post/${id}`);
  };


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleSend = () => {
    if (!inputValue.trim()){
      alert("댓글 란이 비었습니다.");
      return;
    } // 빈 입력 방지
    const newComment = {
      id: comment.length + 1,
      author: "나",
      content: inputValue,
      timestamp: new Date().toLocaleString("ko-KR", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMine: true, // 내가 보낸 메시지
    };
    setComment([...comment, newComment]); // 새 댓글 추가
    if(token){
      postComment(id,newComment.content,token);
      setInputValue(""); // 입력 초기화
    }
  };
  


  return (
    <>
      <HeaderBar>
        <div className="HeadGroup">
          <button className="backBtn" onClick={goToHome}>
            <img src="/assets/header_back.svg" alt="뒤로가기" />
          </button>
          <span>댓글</span>
        </div>
      </HeaderBar>
      <Container>
        <CommentList>
          {comment.map((comment) => (
            <CommentBubble key={comment.id} isMine={comment.isMine}>
              {/* 프로필 이미지 */}
              {!comment.isMine && <img src="/assets/empty_profile.svg" alt="빈 프로필" />}


              {/* 텍스트 영역 */}
              <div className="content-wrap">
                <span className="author">{comment.author}</span>
                <span className="time-stamp">{comment.timestamp}</span>
                <Content isMine={comment.isMine}>{comment.content}</Content>
              </div>
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
          <SendButton src="/assets/sendBtn.svg" onClick={handleSend}/>
        </InputContainer>
      </Container>
    </>
  );
};


export default Comment;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 30px;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
`;


const HeaderBar = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid var(--color-main);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;


  .HeadGroup {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; /* 상하좌우 중앙 정렬 */
    gap: 7px;
    position: relative;

    span{
      font-size:20px;
      font-weight:600;
    }
  }


  .backBtn {
    display:flex;
    justify-content:center;
    font-size: 48px;
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    left: 20px; /* 왼쪽에서 20px 떨어짐 */
  }


  span {
    font-size: 16px;
    font-weight: bold;
  }
`;


const CommentList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
`;


const CommentBubble = styled.div`
  display: flex;
  flex-direction:${(props)=> (props.isMine ? "row-reverse" : "row")};
  align-items: flex-start; /* 이미지와 텍스트의 정렬 */
  margin: 5px 0;


  img {
    width: 40px;
    height: 40px;
    border-radius: 0; /* 사각형 이미지 */
    margin-right: 10px; /* 텍스트와 이미지 간격 */
  }


  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.isMine ? "flex-end" : "flex-start")};
    max-width: 70%; /* 텍스트 영역 최대 크기 */
  }


  .author {
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => (props.isMine ? "#007aff" : "#333")};
  }


  .time-stamp {
    font-size: 0.75rem;
    color: #666;
    margin-top: 3px;
  }
`;


const Content = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: ${(props) =>
    props.isMine ? "12px 0 12px 12px" : "0 12px 12px 12px"}; /* 내 메시지일 땐 오른쪽 위 0 */
  margin-top: 5px;
  background-color: ${(props) => (props.isMine ? "#e5f7ff" : "#fff")}; /* 내 메시지 배경 색 */
  word-wrap: break-word;
`;


const InputContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding:4px;
  border-top: 1px solid var(--color-main);
  position: fixed;
  left: 0;
  bottom: 0;
`;


const Input = styled.input`
  border:none;
  font-size: 1rem;
  outline: none;
  min-width: 310px;
  max-width: 350px;
`;


const SendButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position:absolute;
  right:14px;
  bottom:10px;


  &:hover {
    color:#af3400;
  }
`;