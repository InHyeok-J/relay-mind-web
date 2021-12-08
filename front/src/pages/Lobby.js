import React, {useState} from "react";
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import RoomComponent from "./components/RoomComponent";

const onInfo = () => {
    alert("내 정보 확인은 준비중입니다.");
}

const Lobby = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground})
`;

const Sidebar = styled.div`
    width: 20vw;
    background-color: #eeeeee;
`

const MyInfo = styled.div`
    width: 100%;
    background-color: #bbbbbb;
    padding: 1rem 0;
`

const PlayerList = styled.div`
    
`

const RoomContents = styled.div`
    width: 78vw;
    height: 95vh;
    margin: 5vh 1vw 0 1vw;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: left;
`

const RoomCreateButton = styled.button`
    display: inline-block;
    width: 115px;
    height: 40px;
    padding: .5rem;
    background: ${props => props.bgcolor};
    border: 0px solid #FFFFFF;
    border-radius: 10px 10px 0 0;
    padding: .5rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #000000;
    &:hover {
        background: ${props => props.hoverColor};
    }
    &:active {
        background: ${props => props.activeColor};
    }
`

const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 1vw);
    height: calc(95vh - 40px - 1vh);
    padding: .5vh .5vw;
    background-color: rgba(255, 255, 255, 0.3);
`

const FullLogo = {
    width: "90%",
    margin: ".5rem auto"
}

const userName = {
    display: "inline-block",
    margin: "0 0 .5rem 0",
    fontWeight: "bold",
    fontSize: "1.2rem"
}

function LobbyComponent() {
    const { user: userData } = useSelector((state) => state.user);
    const history = useHistory();

    if(!userData) {
        alert("로그인이 필요합니다!");
        history.push('/');
    }

    return (
        <Lobby>
            <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo}/>
                <MyInfo onClick={onInfo}>
                    <span className="material-icons">brush</span><p style={userName}>{userData.nickname}</p>
                </MyInfo>
                <PlayerList>
                    <p><strong>접속자 목록</strong></p>
                    DummyUser123
                </PlayerList>
            </Sidebar>
            <RoomContents>
                <ButtonWrapper>
                    <RoomCreateButton bgcolor="#FFCCCC" hoverColor="#FFDDDD" activeColor="#FFBBBB" onClick={() => alert("방만들기 클릭")}>방만들기</RoomCreateButton>
                    <RoomCreateButton bgcolor="#AAEBFF" hoverColor="#BBFCFF" activeColor="#99DAFF" onClick={() => alert("새로고침 클릭")}>새로고침</RoomCreateButton>
                </ButtonWrapper>
                <RoomList>
                    <RoomComponent isOpen={false} roomNumber="1"/>
                    <RoomComponent isOpen={true} roomNumber="2"/>
                    <RoomComponent isOpen={true} roomNumber="3"/>
                    <RoomComponent isOpen={true} roomNumber="4"/>
                    <RoomComponent isOpen={true} roomNumber="5"/>
                </RoomList>
            </RoomContents>
        </Lobby>
    );
}

export default LobbyComponent;
