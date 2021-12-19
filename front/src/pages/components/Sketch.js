import React, { useCallback, useEffect, useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { drawKeywordAction, postKeywordAction } from '../../module/game';

// const defaultProps = {
//     onChange: null,
//     loadTimeOffset: 5,
//     lazyRadius: 30,
//     brushRadius: 12,
//     brushColor: "#000",
//     catenaryColor: "#0a0302",
//     gridColor: "rgba(150,150,150,0.17)",
//     hideGrid: false,
//     canvasWidth: "4000",
//     canvasHeight: 400,
//     disabled: false,
//     imgSrc: "",
//     saveData: null,
//     immediateLoading: false,
//     hideInterface: false,
//     gridSizeX: 25,
//     gridSizeY: 25,
//     gridLineWidth: 0.5,
//     hideGridX: false,
//     hideGridY: false,
//     enablePanAndZoom: false,
//     mouseZoomFactor: 0.01,
//     zoomExtents: { min: 0.33, max: 3 },
// };
const Block = styled.div`
    width: 100%
    height: 50px;
    display: flex;
    justify-content: center;
`;
const marginElement = {
    margin: 'auto',
};

function Sketch({ color, roomId, keywordData }) {
    let saveableCanvas = null;
    const canvasRef = useRef(null);
    const [delay, setDelay] = useState(false);
    const [brushSize, setBrushSize] = useState(7);
    const dispatch = useDispatch();
    const { game, drawkeyword } = useSelector((state) => state.game);
    let player;
    if (game.phase === 2) {
        player = game.gamePlayer.filter(
            (v) => v.keyword === keywordData.keyword,
        );
    } else {
    }
    async function onSend() {
        const value =
            canvasRef.current.canvasContainer.childNodes[1].toDataURL();
        try {
            await dispatch(
                drawKeywordAction({
                    value,
                    roomId,
                    phase: game.phase,
                    playerId: player[0].id,
                }),
            );
        } catch (err) {
            console.error(err);
        }
    }
    const onClear = () => {
        canvasRef.clear();
    };
    const onSizeUp = () => {
        if (brushSize >= 15) {
            return;
        } else {
            setBrushSize(brushSize + 2);
        }
    };
    const onSizeDown = () => {
        if (brushSize <= 3) {
            return;
        } else {
            setBrushSize(brushSize - 2);
        }
    };

    useEffect(() => {
        if (drawkeyword && drawkeyword.message === 'delay') {
            setDelay(true);
        } else if (drawkeyword && drawkeyword.message === 'success') {
            setDelay(false);
        }
    }, [drawkeyword]);

    return (
        <>
            <CanvasDraw
                ref={canvasRef}
                canvasWidth={900}
                canvasHeight={600}
                brushColor={color}
                brushRadius={brushSize}
                style={marginElement}
            />
            <div style={{ margin: '0 auto', width: '500px' }}>
                <Block>
                    <CustomButton onClick={onSizeUp}>
                        지우개 사이즈 키우기
                    </CustomButton>

                    <CustomButton onClick={onSizeDown}>
                        지우개 사이즈 줄이기
                    </CustomButton>

                    <CustomButton onClick={() => onClear()}>
                        초기화
                    </CustomButton>
                </Block>
                {delay ? (
                    <div>입력하실수 없습니다..</div>
                ) : (
                    <Block>
                        <CustomButton onClick={onSend}>전송</CustomButton>
                    </Block>
                )}
            </div>
        </>
    );
}

export default Sketch;

const CustomButton = styled.button`
    padding: 5px;
    background-color: #916bdd;
    color: #ffffff;
    margin-right: 10px;
`;

const Input = styled.input`
    display: block;
    width: 25vw;
    height: 5%;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #cccccc;
`;
