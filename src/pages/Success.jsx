import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Success = () => {
    const navigate=useNavigate();
    const goToHome=()=>{
        navigate("/");
    }
    return (
        <>
            <SuccessWrapper>
                <div className='main'>
                    <img src='/assets/success_check.png' alt='check'/>
                    <span>예약이 완료되었습니다.</span>
                </div>

                <button className='goHome' onClick={goToHome}>홈으로</button>

            </SuccessWrapper>
        </>
    );
};

export default Success;

const SuccessWrapper=styled.div`
    width:100%;
    height:100vh;
    box-sizing: border-box;
    position:absolute;
    top:0;
    .main{
        margin:90% auto 70px;
        display:flex;
        flex-direction:column;
    }
    img{
        margin:0 auto;
        width:56px;
        height:40px;
        margin-bottom:30px;
    }
    span{
        font-size:16px;
        text-align:center;
    }
    button{
        width:120px;
        height:40px;
        border-radius:108px;
        text-align:center;
        justify-content:center;
        margin:0 auto;
        font-size:16px;
        color:var(--color-white);
        background-color:var(--color-main)
    }
`