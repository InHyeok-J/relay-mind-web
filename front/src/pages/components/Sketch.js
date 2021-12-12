import React from "react";
import CanvasDraw from "react-canvas-draw";
/*
const defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#000",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: "4000",
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false,
    gridSizeX: 25,
    gridSizeY: 25,
    gridLineWidth: 0.5,
    hideGridX: false,
    hideGridY: false,
    enablePanAndZoom: false,
    mouseZoomFactor: 0.01,
    zoomExtents: { min: 0.33, max: 3 },
};*/

const marginElement = {
    margin: "auto"
}

function Sketch({color}) {
    let saveableCanvas = null;

    function onDataView() {
        const img = saveableCanvas.getSaveData();
        console.log(img);
    }

    return (
        <>
            <CanvasDraw
                ref={(canvasDraw) => (saveableCanvas = canvasDraw)}
                canvasWidth={800}
                canvasHeight={800}
                brushColor={color}
                style={marginElement}
            />
            <button onClick={() => onDataView()}>display canvas data</button>
        </>
    )
}

export default Sketch;
