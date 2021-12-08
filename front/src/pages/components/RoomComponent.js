import React from "react";
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

function DisplayRoomComponent({isOpen, roomNumber}) {
    const history = useHistory();

    if (isOpen)
        return (
            <RoomComponentButton bgcolor="#cccccc" hoverColor="#dddddd" activeColor="#bbbbbb" onClick={() => history.push('/GameRoom')}>
                <p>#{roomNumber}</p>
                <p>입장 인원 : 6 / 6</p>
            </RoomComponentButton>
        );
    else
        return (
            <RoomComponentButton bgcolor="#aaaaaa" hoverColor="#aaaaaa" activeColor="#aaaaaa" onClick={() => alert("참여 불가능한 방입니다.")}>
                <p>#{roomNumber}</p>
                <p>게임 중</p>
            </RoomComponentButton>
        );
}

function RoomComponent({isOpen, roomNumber}) {
    return (
        <DisplayRoomComponent isOpen={isOpen} roomNumber={roomNumber}/>
    );
}

export default RoomComponent;

const RoomComponentButton = styled.div`
    width: 36%;
    height: 150px;
    margin: 2%;
    padding: 2%;
    background-color: ${props => props.bgcolor};
    border-radius: 10px;
    font-size: 1.7rem;
    font-weight: bold;
    &:hover {
        background: ${props => props.hoverColor};
    }
    &:active {
        background: ${props => props.activeColor};
    }
`
