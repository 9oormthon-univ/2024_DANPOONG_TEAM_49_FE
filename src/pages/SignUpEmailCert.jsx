import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SignUpEmailCert = () => {
    // navigate
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };

    return (
        <Container>
            <h1>인증 코드 입력</h1>
            <h5>발송된 인증 코드를 입력해주세요</h5>
            <input
                type="text"
                placeholder="입력"
            />
            <InputButton
                type="button"
                value="다음  →"
                onClick={goToMain}
            />
        </Container>
    );
};

export default SignUpEmailCert;


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
    background-color: #AF3400;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;
