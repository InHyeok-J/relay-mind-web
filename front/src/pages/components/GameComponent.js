import React from 'react';
import styled from 'styled-components';

const GameComponentButton = styled.div`
    border: 1px solid #cccccc;
    border-radius: 10px;
    padding: 1rem;
    margin: 1rem;
    &:hover {
        background: #dddddd;
    }
    &:active {
        background: #cccccc;
    }
`;

const roomTitle = {
    fontWeight: 'bold',
};

function parsingDate(rawDate) {
    if (!rawDate) return '';
    let data = rawDate.toString();
    return data.split('T')[0];
}

function GameComponent(data) {
    console.log(data);
    const key = data.data;
    function getDetail(gameId) {
        data.setGameId(gameId);
        data.setModalIsOpen(true);
    }

    return (
        <GameComponentButton onClick={() => getDetail(key.gameRoom.id)}>
            <span style={roomTitle}>
                #{key.gameRoom.id} {key.gameRoom.title}
            </span>{' '}
            {key.gameRoom.isSecret && (
                <span style={{ color: 'red' }}>비밀방</span>
            )}
            <span>{key ? parsingDate(key.gameRoom.updatedAt) : ''}</span>
        </GameComponentButton>
    );
}

export default GameComponent;
