import RoomComponent from "./RoomComponent";
import React from "react";
import styled from "styled-components";

const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 1vw);
    height: calc(95vh - 40px - 1vh);
    padding: .5vh .5vw;
    background-color: rgba(255, 255, 255, 0.3);
`

const displayRoomList = (props) => {
    console.log("프롭스 전달");
    console.log(props);
    return (
        <RoomList>
            {props.map((props) => <RoomComponent isOpen={true} roomNumber={props.id} title={props.title}/>)}
        </RoomList>
    )
}

export default displayRoomList;
