import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { setSocketAction } from '../module/socket';
import { getGameInfoAction } from '../module/game';

const InGame = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground});
`;

const Sidebar = styled.div`
    width: 25vw;
    background-color: rgba(230, 230, 230, 0.6);
`;

const ChatDiv = styled.div`
    height: 87.5vh;
    overflow-y: auto;
`;

const ChatInput = styled.input`
    width: 100%;
    height: 6vh;
    padding: 0;
    border: 0;
`;

const RoomMain = styled.div`
    width: 75vw;
    background-color: rgba(0, 0, 0, 0.2);
`;

const UserInRoom = styled.div`
    width: 100%;
    margin: 2rem 0;
    font-weight: bold;
    font-size: 2rem;
`;

const UserList = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
`;

const UserComponent = styled.div`
    width: 40%;
    height: 12%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    background-color: rgba(230, 230, 230, 0.7);
`;

const UserNickname = styled.p``;

const RoomMenu = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const RoomButton = styled.button`
    display: inline-block;
    width: 115px;
    height: 40px;
    padding: 0.5rem;
    margin: 0 1rem;
    background: ${(props) => props.bgcolor};
    border: 0px solid #ffffff;
    border-radius: 10px;
    padding: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
    color: #000000;
    &:hover {
        background: ${(props) => props.hoverColor};
    }
    &:active {
        background: ${(props) => props.activeColor};
    }
`;

const FullLogo = {
    height: '6vh',
};

function GameRoom({ match }) {
    const { user: userData } = useSelector((state) => state.user);
    const { game } = useSelector((state) => state.game);
    const { socket } = useSelector((state) => state.socket);
    const [onlineList, setOnlineList] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const roomId = match.params.id;
    useEffect(async () => {
        dispatch(setSocketAction());
        await dispatch(getGameInfoAction(roomId));
    }, []);

    useEffect(() => {
        if (socket) {
            return () => {
                socket.emit('leave', roomId);
            };
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('join', roomId);
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('joinResponse', (data) => {
                if (!data.roomUserList) {
                    return;
                }
                const userList = Object.keys(data.roomUserList);

                setOnlineList({
                    roomUserList: data.roomUserList,
                    userKeyArray: userList,
                });
            });
            socket.on('socketError', (data) => {
                alert('꽉 찬 방입니다');
                history.push('/Lobby');
            });
        }
    }, [socket]);

    if (!onlineList || !game) return null;

    return (
        <InGame>
            <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo} />
                <ChatDiv>
                    <span>{userData.nickname}님이 방에 입장했습니다!</span>
                </ChatDiv>
                <ChatInput />
            </Sidebar>
            <RoomMain>
                <UserInRoom>{onlineList.userKeyArray.length} / 6</UserInRoom>
                <UserList>
                    <UserComponent>
                        {onlineList.userKeyArray.map((v) => {
                            return <UserNickname>{v}</UserNickname>;
                        })}
                    </UserComponent>
                </UserList>
                <RoomMenu>
                    {game.gamePlayer.map((user) => {
                        if (user.player.id === userData.id && user.isOwner) {
                            return (
                                <RoomButton
                                    bgcolor="#AAEBFF"
                                    hoverColor="#BBFCFF"
                                    activeColor="#99DAFF"
                                    onClick={() => history.push('/PlayGame')}
                                >
                                    게임시작
                                </RoomButton>
                            );
                        }
                    })}

                    <RoomButton
                        bgcolor="#FFCCCC"
                        hoverColor="#FFDDDD"
                        activeColor="#FFBBBB"
                        onClick={() => history.push('/Lobby')}
                    >
                        나가기
                    </RoomButton>
                </RoomMenu>
            </RoomMain>
        </InGame>
    );
}

export default withRouter(GameRoom);
