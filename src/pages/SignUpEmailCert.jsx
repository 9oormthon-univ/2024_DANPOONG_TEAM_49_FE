import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import progressBarImage from '../images/progressBar2.svg';

const SignUpEmailCert = () => {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate("/");
    };

    return (
        <>
            <HeaderBar>
                <BackButton onClick={() => navigate('/signUpEmail')}>&lt;</BackButton>
            </HeaderBar>
            <Container>
                <h1>인증 코드 입력</h1>
                <h5>발송된 인증 코드를 입력해주세요</h5>
                <InputField type="text" placeholder="학교 이메일 입력" />
                <InputButton
                    type="button"
                    value="다음  →"
                    onClick={() => navigate('/signUpSite')}
                />
            </Container>
        </>
    );
};

export default SignUpEmailCert;

const HeaderBar = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    position: relative;
    background: url(${progressBarImage}) no-repeat center bottom;
    background-size: 100% 12px;
    object-fit: cover;
`;

const BackButton = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
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

const InputField = styled.input`
    margin-top: 10px;
    padding: 10px;
    width: 70%;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
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
