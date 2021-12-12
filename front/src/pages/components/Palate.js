import styled from 'styled-components';
import React from "react";

const Paint = styled.div`
    display: inline-block;
    background-color: ${(props) => props.color};
    width: 30px;
    height: 30px;
`

function Palate({changeColors}) {
    function onChangeColor(props) {
        changeColors(props);
    }

    return(
        <>
            <Paint color="black" className="black" onClick={() => onChangeColor("black")}/>
            <Paint color="red" className="red" onClick={() => onChangeColor("red")}/>
            <Paint color="orange" className="orange" onClick={() => onChangeColor("orange")}/>
            <Paint color="yellow" className="yellow" onClick={() => onChangeColor("yellow")}/>
            <Paint color="green" className="green" onClick={() => onChangeColor("green")}/>
            <Paint color="blue" className="blue" onClick={() => onChangeColor("blue")}/>
            <Paint color="purple" className="purple" onClick={() => onChangeColor("purple")}/>
            <Paint color="white" className="white" onClick={() => onChangeColor("white")}/>
        </>
    );
}

export default Palate;
