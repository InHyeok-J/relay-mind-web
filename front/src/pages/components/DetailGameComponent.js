import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getGameInfoAction } from '../../module/game';

const DetailGameView = styled.div`
    width: 50vw;
    max-height: 80vh;
    overflow-y: auto;
`;

function parseDate(rawData) {
    const parsedData = rawData.split(/T| |Z/);
    return parsedData[0] + ' ' + parsedData[1];
}

function DetailGameComponent({ gameId }) {
    const dispatch = useDispatch();
    const { game } = useSelector((state) => state.game);
    console.log(game);
    useEffect(async () => {
        await dispatch(getGameInfoAction(gameId));
    }, []);

    if (!game) return <div>로딩중</div>;
    return (
        <DetailGameView>
            <h3>게임 정보</h3>
            <p>방 제목 : {game.title}</p>
            <p>플레이 타임 : {parseDate(game.updatedAt)}</p>
            <p>비밀방 여부 : {game.isSecret ? '비밀방' : '공개방'}</p>
            <hr />
            {game.gamePlayer.map((list) => {
                return (
                    <>
                        <h4>{list.keyword}</h4>
                        <p>제시한 사람 : {list.player.nickname}</p>
                        {list.drawList.map((item) => {
                            return (
                                <>
                                    <img
                                        src={item.drawValue.toString()}
                                        style={{ width: '500px' }}
                                        alt="received image"
                                    />
                                    <p>
                                        그린 사람 : {item.drwaingUser.nickname}
                                    </p>
                                </>
                            );
                        })}
                        <hr />
                    </>
                );
            })}
        </DetailGameView>
    );
}

export default DetailGameComponent;
