import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { setSocketAction } from '../module/socket';
import {
    gameStartAction,
    getGameInfoAction,
    initKeywordAction,
} from '../module/game';
import PlayGame from './PlayGame';
import KeywordSendModal from './components/KeywordSendModal';
import GameEnd from './components/GameEnd';

const InGame = styled.div`
    width: 100%;
    height: 1200px;
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

const UserInRoom = styled.div`
    width: 100%;
    margin: 2rem 0;
    font-weight: bold;
    font-size: 1.5rem;
`;

const UserList = styled.div`
    width: 100%;
    margin-bottom: 200px;
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
    background-color: rgba(240, 240, 240, 0.7);
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
    const [modalState, setModalState] = useState(false);
    const [onlineList, setOnlineList] = useState(null);
    const [nextPhaseData, setNextPhaseData] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const roomId = match.params.id;
    useEffect(async () => {
        dispatch(setSocketAction());
        await dispatch(getGameInfoAction(roomId));
        await dispatch(initKeywordAction());
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
            socket.on('gameStart', async (data) => {
                console.log('게임시작이벤트 발생');
                setModalState(true);
                await dispatch(getGameInfoAction(roomId));
            });
            socket.on('nextPhase', async (data) => {
                console.log('다음 스탭');
                console.log(data);
                setModalState(false);
                await dispatch(initKeywordAction());
                setNextPhaseData(data);
                await dispatch(getGameInfoAction(roomId));
            });
            socket.on('end', async (data) => {
                console.log('게임종료');
                await dispatch(getGameInfoAction(roomId));
            });
        }
        // return () => {
        //     if (socket) {
        //         socket.off('joinResponse');
        //         socket.off('socketError');
        //         socket.off('gameStart');
        //     }
        // };
    }, [socket]);

    const gameStart = async () => {
        try {
            await dispatch(gameStartAction({ roomId }));
        } catch (err) {
            console.error(err);
            alert(err.response.data.message);
        }
    };
    if (!onlineList || !game) return null;

    return (
        <InGame>
            <Modal isOpen={modalState} style={modalStyle} ariaHideApp={false}>
                <KeywordSendModal
                    setModalState={setModalState}
                    roomId={roomId}
                    phase={game.phase}
                />
            </Modal>
            <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo} />
                <UserInRoom>{game.title}</UserInRoom>
                <UserInRoom>
                    방장:{' '}
                    {game.gamePlayer.map((user) => {
                        if (user.isOwner === true) {
                            return user.player.nickname;
                        }
                    })}
                </UserInRoom>
                <UserInRoom>
                    접속 유저 : {onlineList.userKeyArray.length} / 6
                </UserInRoom>
                <UserList>
                    <UserComponent>
                        {onlineList.userKeyArray.map((v) => {
                            return <div>{v}</div>;
                        })}
                    </UserComponent>
                </UserList>
                <RoomMenu>
                    {game.status === 'Open' &&
                        game.gamePlayer.map((user) => {
                            if (
                                user.player.id === userData.id &&
                                user.isOwner
                            ) {
                                return (
                                    <RoomButton
                                        bgcolor="#AAEBFF"
                                        hoverColor="#BBFCFF"
                                        activeColor="#99DAFF"
                                        onClick={gameStart}
                                    >
                                        게임시작
                                    </RoomButton>
                                );
                            }
                        })}
                    {game.status != 'Gaming' && (
                        <RoomButton
                            bgcolor="#FFCCCC"
                            hoverColor="#FFDDDD"
                            activeColor="#FFBBBB"
                            onClick={() => history.push('/Lobby')}
                        >
                            나가기
                        </RoomButton>
                    )}
                </RoomMenu>
            </Sidebar>

            {game.status === 'Gaming' && nextPhaseData && (
                <PlayGame
                    nextPhaseData={nextPhaseData.nextPhase}
                    roomId={roomId}
                />
            )}
            {game.status === 'Close' && <GameEnd></GameEnd>}
        </InGame>
    );
}

export default withRouter(GameRoom);

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
