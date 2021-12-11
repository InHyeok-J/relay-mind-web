import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SocketClient from 'socket.io-client';
import { logoutAction, getUserAction } from '../module/user';
import { getGameListAction } from '../module/game';
import displayRoomList from './components/RoomListComponent';
import Modal from 'react-modal';
import CreateRoomModal from './components/CreateRoomModal';

const onInfo = () => {
    alert('내 정보 확인은 준비중입니다.');
};

const Lobby = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground});
`;

const Sidebar = styled.div`
    width: 20vw;
    background-color: #eeeeee;
`;

const MyInfo = styled.div`
    width: 100%;
    background-color: #bbbbbb;
    padding: 1rem 0;
`;

const PlayerList = styled.div``;

const RoomContents = styled.div`
    width: 78vw;
    height: 95vh;
    margin: 5vh 1vw 0 1vw;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: left;
`;

const RoomCreateButton = styled.button`
    display: inline-block;
    width: 115px;
    height: 40px;
    padding: 0.5rem;
    background: ${(props) => props.bgcolor};
    border: 0px solid #ffffff;
    border-radius: 10px 10px 0 0;
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
    width: '90%',
    margin: '.5rem auto',
};

const userName = {
    display: 'inline-block',
    margin: '0 0 .5rem 0',
    fontWeight: 'bold',
    fontSize: '1.2rem',
};

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

const LobbyComponent = (callback, deps) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userList, setUserList] = useState(null);
    const { user: userData } = useSelector((state) => state.user);
    const { data: gameData } = useSelector((state) => state.game);
    let io;
    useEffect(async () => {
        await dispatch(getGameListAction());
    }, []);

    useEffect(() => {
        io = SocketClient('http://localhost:4000/relayMind', {
            transports: ['websocket'],
        });
        io.on('userList', (data) => {
            console.log(data);
            setUserList(data.userList);
        });
        console.log('Socket Init');
    }, []);

    useEffect(() => {
        io.on('userList', (data) => {
            console.log(data);
            setUserList(data.userList);
        });
    }, [io]);

    const onLogout = useCallback(async (e) => {
        try {
            await dispatch(logoutAction());
            alert('로그아웃 되었습니다.');
            history.push('/');
        } catch (err) {
            console.error('에러:' + err);
            alert('로그아웃 실패');
        }
    }, []);

    if (!gameData || !userData) return null;

    return (
        <Lobby>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <CreateRoomModal />
            </Modal>
            <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo} />
                <MyInfo onClick={onInfo}>
                    <span className="material-icons">brush</span>
                    <p style={userName}> {userData.nickname}</p>
                </MyInfo>
                <PlayerList>
                    <p>
                        <strong>접속자 목록</strong>
                    </p>
                    {userList ? (
                        userList.map((user) => (
                            <div key={user.nickname}>{user}</div>
                        ))
                    ) : (
                        <>DummyUser123</>
                    )}
                </PlayerList>
            </Sidebar>
            <RoomContents>
                <ButtonWrapper>
                    <RoomCreateButton
                        bgcolor="#FFCCCC"
                        hoverColor="#FFDDDD"
                        activeColor="#FFBBBB"
                        onClick={() => setModalIsOpen(true)}
                    >
                        방만들기
                    </RoomCreateButton>
                    <RoomCreateButton
                        bgcolor="#AAEBFF"
                        hoverColor="#BBFCFF"
                        activeColor="#99DAFF"
                        onClick={async () => {
                            await dispatch(getGameListAction());
                        }}
                    >
                        새로고침
                    </RoomCreateButton>
                    <RoomCreateButton
                        bgcolor="#c7aaff"
                        hoverColor="#dfcfff"
                        activeColor="#916bdd"
                        onClick={onLogout}
                    >
                        로그아웃
                    </RoomCreateButton>
                </ButtonWrapper>
                {gameData ? displayRoomList(gameData) : '로딩중'}
            </RoomContents>
        </Lobby>
    );
};

export default LobbyComponent;
