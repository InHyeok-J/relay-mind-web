import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fullLogo from '../assets/RM_FullLogo.png';
import paperBackground from '../assets/Bg_paperTexture.jpg';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Notice from './components/Notice';
import Palate from './components/Palate';
import Sketch from './components/Sketch';

const InGame = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: left;
    background-image: url(${paperBackground});
`;

const RoomMain = styled.div`
    width: 75vw;
    background-color: rgba(0, 0, 0, 0.2);
`;

const FullLogo = {
    height: '6vh',
};

function PlayGame({ nextPhaseData, roomId }) {
    const [color, setColor] = useState('black');
    const [keyword, setKeyword] = useState(null);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        if (nextPhaseData) {
            console.log(nextPhaseData);

            const myData = nextPhaseData.filter((v) => v.id === user.id);
            console.log(myData);
            setKeyword(myData[0]);
        }
    }, [nextPhaseData]);
    console.log(keyword);
    if (!keyword) return null;
    return (
        <InGame>
            {/* <Sidebar>
                <img src={fullLogo} alt="FullLogo" style={FullLogo} />
                <ChatDiv></ChatDiv>
                <ChatInput />
            </Sidebar> */}
            <RoomMain>
                <Notice content={keyword.keyword} />
                <Palate changeColors={setColor} />
                <Sketch color={color} roomId={roomId} keywordData={keyword} />
            </RoomMain>
        </InGame>
    );
}

export default PlayGame;
