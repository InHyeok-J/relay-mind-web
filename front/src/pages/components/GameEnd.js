import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CanvasDraw from 'react-canvas-draw';

const GameEndWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const GameEnd = () => {
    const { game } = useSelector((state) => state.game);
    console.log(game);
    return (
        <GameEndWrapper>
            <h3>Game 종료</h3>
            {game.gamePlayer.map((player) => {
                return (
                    <DrawBlock>
                        <div style={{ fontSize: '21px', fontWeight: 'bold' }}>
                            {player.player.nickname}의 키워드 : {player.keyword}
                        </div>
                        <div
                            style={{
                                fontSize: '21px',
                                fontWeight: 'bold',
                                color: 'tomato',
                            }}
                        >
                            그린 사람 :{' '}
                            {player.drawList[0].drwaingUser.nickname}
                        </div>
                        <img
                            src={player.drawList[0].drawValue}
                            alt="exported drawing"
                        />
                    </DrawBlock>
                );
            })}
        </GameEndWrapper>
    );
};

export default GameEnd;

const DrawBlock = styled.div`
    width: 50%;
    img {
        weight: 300px;
        height: 300px;
    }
`;
