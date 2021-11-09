import React, {useState} from "react";
import styled from 'styled-components';
import shortLogo from "../../assets/RM_ShortLogo.png";

const Modal = styled.div`
    display: block;
    min-width: 20vw;
`

const LoginInput = styled.input`
    display: block;
    width: 20vw;
    height: 10%;
    padding: 1rem;
    margin: .5rem auto;
    border-radius: 4px;
    border: 1px solid #cccccc;
`;

const LoginMethod = styled.button`
    display: block;
    width: 100%;
    height: 10%;
    padding: 1rem;
    margin: .5rem auto;
    text-align: center;
    background-color: ${props => props.bgcolor};
    border: 2px solid ${props => props.bgcolor};
    color: ${props => props.color};
    font-size: 1rem;
    font-weight: bold;
`;

const ShortLogo = {
    display: "block",
    width: "10vw",
    margin: "3rem auto",
}

const RegisterInput = styled.input`
    display: block;
    width: 20vw;
    height: 10%;
    padding: 1rem;
    margin: .5rem auto;
    border-radius: 4px;
    border: 1px solid #cccccc;
`

function LoginRegister() {
    const [register, setRegister] = useState(false);

    if (!register)
        return (
            <Modal>
                <img src={shortLogo} alt="shortLogo" style={ShortLogo}/>
                <LoginInput placeholder="아이디"/>
                <LoginInput placeholder="비밀번호" type="password"/>
                <LoginMethod bgcolor="#63A4DF" color="#FFFFFF">로그인</LoginMethod>
                <LoginMethod bgcolor="#FFFFFF" color="#63A4DF" onClick={() => setRegister(true)}>회원가입</LoginMethod>
                <LoginMethod bgcolor="#F9E000" color="#3b1e1e">카카오 로그인</LoginMethod>
                <LoginMethod bgcolor="#F65314" color="#FFFFFF">Google 로그인</LoginMethod>
            </Modal>
        );
    else return (
        <Modal>
            <h3>회원가입</h3>
            <RegisterInput placeholder="아이디"/>
            <RegisterInput placeholder="비밀번호" type="password"/>
            <RegisterInput placeholder="닉네임"/>
            <LoginMethod bgcolor="#63A4DF" color="#FFFFFF" onClick={() => setRegister(false)}>확인</LoginMethod>
        </Modal>
    );
}


function LoginModal() {
    return (
        <LoginRegister/>
    );
}

export default LoginModal;
