import React from "react";
import styled from 'styled-components';
import {useHistory} from "react-router-dom";

function DisplayRoomComponent({isOpen, roomNumber, title}) {
    const history = useHistory();

    if (isOpen)
        return (
            <RoomComponentButton bgcolor="#cccccc" hoverColor="#dddddd" activeColor="#bbbbbb" onClick={() => history.push('/GameRoom')}>
                <span>#{roomNumber}</span>
                <RoomDataP>{title}</RoomDataP>
                <span>2 / 6</span>
            </RoomComponentButton>
        );
    else
        return (
            <RoomComponentButton bgcolor="#aaaaaa" hoverColor="#aaaaaa" activeColor="#aaaaaa" onClick={() => alert("참여 불가능한 방입니다.")}>
                <p>#{roomNumber}</p>
                <p>{title}</p>
                <p>게임 중</p>
            </RoomComponentButton>
        );
}

function RoomComponent({isOpen, roomNumber, title}) {
    return (
        <DisplayRoomComponent isOpen={isOpen} roomNumber={roomNumber} title={title}/>
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

const RoomDataP = styled.p`
    margin: 0.5em;
`
