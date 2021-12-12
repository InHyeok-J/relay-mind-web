import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import LoginModal from './components/MainModal';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
`;

const Introduce = styled.div`
    width: 75vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-image: url(${paperBackground});
`;
// background: repeating-linear-gradient(-45deg, #FFF, #FFF 40px, #EEE 0, #EEE 80px);
const Login = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: 320px;
    width: 25vw;
    height: 100vh;
    background-color: #63a4df;
    background: repeating-linear-gradient(
        -45deg,
        #63a4df,
        #63a4df 40px,
        #5293ce 0,
        #5293ce 80px
    );
`;

const Pattern = styled.div`
    background-color: #555;
    background-image: linear-gradient(
            30deg,
            #444 12%,
            transparent 12.5%,
            transparent 87%,
            #444 87.5%,
            #444
        ),
        linear-gradient(
            150deg,
            #444 12%,
            transparent 12.5%,
            transparent 87%,
            #444 87.5%,
            #444
        ),
        linear-gradient(
            30deg,
            #444 12%,
            transparent 12.5%,
            transparent 87%,
            #444 87.5%,
            #444
        ),
        linear-gradient(
            150deg,
            #444 12%,
            transparent 12.5%,
            transparent 87%,
            #444 87.5%,
            #444
        ),
        linear-gradient(
            60deg,
            #888 25%,
            transparent 25.5%,
            transparent 75%,
            #888 75%,
            #888
        ),
        linear-gradient(
            60deg,
            #888 25%,
            transparent 25.5%,
            transparent 75%,
            #888 75%,
            #888
        );
    background-position: 0 0, 0 0, 25px 50px, 25px 50px, 0 0, 25px 50px;
    background-size: 50px 100px;
`;

const FullLogo = {
    minWidth: '320px',
    width: '25vw',
    marginLeft: '5vw',
};

const LoginButton = styled.button`
    display: block;
    width: 50%;
    height: 20%;
    background: #ffffff;
    border: 0px solid #ffffff;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin: auto;
    font-weight: bold;
    font-size: 1.75rem;
    color: #63a4df;
    &:hover {
        background: #eeeeee;
    }
    &:active {
        background: #dddddd;
    }
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

// <button onClick={()=> setModalIsOpen(false)}>Modal Close</button>

function MainComponent() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();
    const { user } = useSelector((state) => state.user);
    return (
        <Main>
            <Modal
                isOpen={modalIsOpen}
                style={modalStyle}
                onRequestClose={() => setModalIsOpen(false)}
                ariaHideApp={false}
            >
                <LoginModal />
            </Modal>
            <Introduce>
                <Pattern />
                <img src={fullLogo} alt="FullLogo" style={FullLogo} />
            </Introduce>
            {user ? (
                <Login>
                    <LoginButton onClick={() => history.push('/Lobby')}>
                        로비 이동
                    </LoginButton>
                </Login>
            ) : (
                <Login>
                    <LoginButton onClick={() => setModalIsOpen(true)}>
                        로그인
                    </LoginButton>
                </Login>
            )}
        </Main>
    );
}

export default MainComponent;
