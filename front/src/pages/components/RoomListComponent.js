import RoomComponent from './RoomComponent';
import React from 'react';
import styled from 'styled-components';

const RoomList = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 1vw);
    height: calc(95vh - 40px - 1vh);
    padding: 0.5vh 0.5vw;
    background-color: rgba(255, 255, 255, 0.3);
`;

const displayRoomList = (props) => {
    return (
        <RoomList>
            {props.map((data) => (
                <RoomComponent
                    key={data.id}
                    isOpen={true}
                    roomNumber={data.id}
                    title={data.title}
                    isSecret={data.isSecret}
                />
            ))}
        </RoomList>
    );
};

export default displayRoomList;
