import React from "react";
import styled from "styled-components";
import GameComponent from "./GameComponent";

const PlayList = styled.div`
    width: 100%;
    height: 40vh;
    overflow-y: auto;
`

function PlayedGameList(props, setModalIsOpen, setGameId) {
    return(
        <PlayList>
            {props.map((data) => (
                    <GameComponent
                        data={data}
                        setModalIsOpen={setModalIsOpen}
                        setGameId={setGameId}
                    />
                ))}
        </PlayList>
    )
}

export default PlayedGameList;
