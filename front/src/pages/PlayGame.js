import React, {useState} from "react";
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import Notice from "./components/Notice";
import Palate from "./components/Palate";
import Sketch from "./components/Sketch";

const InGame = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground})
`

const Sidebar = styled.div`
    width: 25vw;
    background-color: rgba(230, 230, 230, 0.6);
`

const ChatDiv = styled.div`
    height: 87.5vh;
    overflow-y: auto;
`

const ChatInput = styled.input`
    width: 100%;
    height: 6vh;
    padding: 0;
    border: 0;
`

const RoomMain = styled.div`
    width: 75vw;
    background-color: rgba(0, 0, 0, 0.2);
`

const UserInRoom = styled.div`
    width: 100%;
    margin: 2rem 0;
    font-weight: bold;
    font-size: 2rem;
`

const UserList = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
`

const UserComponent = styled.div`
    width: 40%;
    height: 12%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: rgba(230, 230, 230, 0.7);
`

const userNickname = styled.p`
    
`

const RoomMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const RoomButton = styled.button`
    display: inline-block;
    width: 115px;
    height: 40px;
    padding: .5rem;
    margin: 0 1rem;
    background: ${props => props.bgcolor};
    border: 0px solid #FFFFFF;
    border-radius: 10px;
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

const FullLogo = {
    height: "6vh"
}

function GameRoom() {
    const { user: userData } = useSelector((state) => state.user);
    const [color, setColor] = useState("black");
    const history = useHistory();

    if(!userData) {
        alert("로그인이 필요합니다!");
        history.push('/');
    }

    return (
        <InGame>
            <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo}/>
                <ChatDiv>
                </ChatDiv>
                <ChatInput/>
            </Sidebar>
            <RoomMain>
                <Notice content="종강"/>
                <Palate changeColors={setColor}/>
                <Sketch color={color}/>
            </RoomMain>
        </InGame>
    );
}

export default GameRoom;
