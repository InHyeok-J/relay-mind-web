import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import PasswordCheckModal from './PasswordCheckModal';

function DisplayRoomComponent({
    isOpen,
    roomNumber,
    title,
    isSecret,
    currentMemberCount,
}) {
    const history = useHistory();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const onClickButton = async () => {
        if (isSecret) {
            setModalIsOpen(true);
        } else {
            history.push(`/GameRoom/${roomNumber}`);
        }
    };
    if (isOpen)
        return (
            <>
                <Modal
                    isOpen={modalIsOpen}
                    style={modalStyle}
                    onRequestClose={() => setModalIsOpen(false)}
                    ariaHideApp={false}
                >
                    <PasswordCheckModal roomNumber={roomNumber} />
                </Modal>
                <RoomComponentButton
                    bgcolor="#cccccc"
                    hoverColor="#dddddd"
                    activeColor="#bbbbbb"
                    onClick={onClickButton}
                >
                    <span>#{roomNumber}</span>
                    {isSecret && <span style={{ color: 'red' }}>비밀방</span>}
                    <RoomDataP>{title}</RoomDataP>
                    <span>{currentMemberCount} / 6</span>
                </RoomComponentButton>
            </>
        );
    else
        return (
            <RoomComponentButton
                bgcolor="#aaaaaa"
                hoverColor="#aaaaaa"
                activeColor="#aaaaaa"
                onClick={() => alert('참여 불가능한 방입니다.')}
            >
                <p>#{roomNumber}</p>
                <p>{title}</p>
                <p>게임 중</p>
            </RoomComponentButton>
        );
}

function RoomComponent({ isOpen, roomNumber, title, isSecret, gameCountList }) {
    console.log(gameCountList);
    let CountKey;
    for (let key in gameCountList) {
        if (roomNumber.toString() === key.toString()) CountKey = key;
    }
    const currentMemberCount = gameCountList[CountKey];
    return (
        <DisplayRoomComponent
            isOpen={isOpen}
            roomNumber={roomNumber}
            title={title}
            isSecret={isSecret}
            currentMemberCount={currentMemberCount}
        />
    );
}

export default RoomComponent;

const RoomComponentButton = styled.div`
    width: 36%;
    height: 150px;
    margin: 2%;
    padding: 2%;
    background-color: ${(props) => props.bgcolor};
    border-radius: 10px;
    font-size: 1.7rem;
    font-weight: bold;
    &:hover {
        background: ${(props) => props.hoverColor};
    }
    &:active {
        background: ${(props) => props.activeColor};
    }
`;

const RoomDataP = styled.p`
    margin: 0.5em;
`;
const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
    },
};
