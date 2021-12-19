import paperBackground from '../assets/Bg_paperTexture.jpg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlayedGameList from './components/PlayedGameList';
import Modal from 'react-modal';
import DetailGameComponent from './components/DetailGameComponent';
import { getProfileAction } from '../module/user';

const Info = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground});
`;

const Profile = styled.div`
    width: 80vw;
    height: 90vh;
    margin: 2rem auto;
    background-color: rgba(255, 255, 255, 0.3);
`;

const profile = {
    fontSize: '5rem',
    fontWeight: 'bold',
};

const brushIcon = {
    fontSize: '5rem',
};

const mockgamelist = [
    {
        id: 17,
        title: '게임한판조지자친구들하윙ㅋㅋ',
        status: 'Open',
        isSecret: false,
        createdAt: '2021-12-08T06:46:53.745Z',
        gamePlayer: [
            {
                id: 10,
                keyword: null,
                isOwner: true,
                player: {
                    id: 14,
                    userId: 'hyeok123',
                    nickname: 'test',
                    password: null,
                },
            },
        ],
    },
    {
        id: 18,
        title: '게임한판조지자친구들하윙ㅋㅋ',
        status: 'Open',
        isSecret: false,
        createdAt: '2021-12-08T06:46:53.745Z',
        gamePlayer: [
            {
                id: 11,
                keyword: null,
                isOwner: true,
            },
        ],
    },
    {
        id: 19,
        title: '게임한판조지자친구들하윙ㅋㅋ',
        status: 'Open',
        isSecret: false,
        createdAt: '2021-12-08T06:46:53.745Z',
        gamePlayer: [
            {
                id: 12,
                keyword: null,
                isOwner: true,
            },
        ],
    },
];

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

const backButtonStyle = {
    position: 'relative',
    top: '0',
    left: '0',
    border: '0px',
    borderRadius: '0 0 20px 20px',
    padding: '1rem',
    fontWeight: 'bold',
    background: 'rgba(255, 255, 255, 0.5)',
};

const MyPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gameId, setGameId] = useState();
    const { user: userData, profile: profileData } = useSelector(
        (state) => state.user,
    );

    useEffect(async () => {
        await dispatch(getProfileAction());
    }, []);
    const onLobby = () => {
        history.push('/Lobby');
    };
    if (!profileData) return <div>로딩중</div>;

    return (
        <Info>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
            >
                <DetailGameComponent gameId={gameId} />
            </Modal>
            <Profile>
                <button onClick={onLobby} style={backButtonStyle}>
                    로비로 돌아가기
                </button>
                <p style={profile}>
                    <span style={brushIcon} className="material-icons">
                        brush
                    </span>
                    {userData.nickname}#{userData.id}
                </p>
                {mockgamelist
                    ? PlayedGameList(profileData, setModalIsOpen, setGameId)
                    : '로딩중'}
            </Profile>
        </Info>
    );
};

export default MyPage;
