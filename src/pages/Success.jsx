import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Success = () => {
    const navigate=useNavigate();
    const goToHome=()=>{
        navigate("/home");
    }
    return (
        <>
            <SuccessWrapper>
                <div className='main'>
                <DotLottieReact
      src="https://lottie.host/dc7e4405-0aeb-47c0-8cea-80943d67144c/MDxIas7gLN.lottie"
      loop
      autoplay
    />
                    <span>예약이 완료되었습니다.</span>
                </div>

                <button className='goHome' onClick={goToHome}>홈으로</button>

            </SuccessWrapper>
        </>
    );
};

export default Success;

const SuccessWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex; /* 플렉스 박스를 활성화 */
    flex-direction: column; /* 세로 정렬 */
    align-items: center; /* 수평 정렬 */
    justify-content: center; /* 수직 정렬 */
    box-sizing: border-box;

    .main {
        display: flex;
        flex-direction: column;
        align-items: center; /* 내부 내용도 중앙 정렬 */
        margin-bottom: 20px; /* 버튼과의 간격 */
    }

    .Lottie {
        margin-bottom: 30px;
    }

    span {
        font-size: 16px;
        text-align: center;
        margin-top: 10px;
    }

    button {
        width: 120px;
        height: 40px;
        border-radius: 108px;
        text-align: center;
        display: flex; /* 버튼 내부 텍스트 정렬 */
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: var(--color-white);
        background-color: var(--color-main);
        border: none; /* 기본 테두리 제거 */
        cursor: pointer;
    }
`;
