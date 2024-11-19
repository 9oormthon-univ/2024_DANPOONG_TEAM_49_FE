import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpEmail = () => {
    // navigate
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };

    return (
        <Container>
            <h1>학교 인증</h1>
            <h5>학교 이메일을 입력해주세요</h5>
            <input
                type="text"
                placeholder="학교 이메일 입력"
            />
            <InputButton
                type="button"
                value="다음 ->"
                onClick={goToMain}
            />
        </Container>
    );
};

export default SignUpEmail;

// 스타일 컴포넌트 정의
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const InputButton = styled.input`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;
