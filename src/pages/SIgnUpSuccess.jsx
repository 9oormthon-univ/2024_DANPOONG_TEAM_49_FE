import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar5.svg';

const SignUpSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/login')}>&lt;</BackButton>
            </HeaderBar>
            <ProgressBar src={progressBarImage} alt="Progress Bar" />
            <Container>
                <h1>회원가입 완료</h1>
                <h5>이제부터 공동구매해주세요</h5>
                <InputButton
                    type="button"
                    value="다음  →"
                    //onClick={gotoMain}
                />
            </Container>
        </>
    );
};

export default SignUpSuccess;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    align-items: center;
    padding: 0 16px;
    position: relative;
`;

const BackButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
`;

const ProgressBar = styled.img`
    width: 100%; /* 화면 너비 전체 */
    height: 12px; /* 고정된 높이 */
`;


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    background-color: #f9f9f9;
`;

const InputButton = styled.input`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #AF3400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
