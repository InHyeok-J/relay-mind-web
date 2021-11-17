import styled from "styled-components";
import React from "react";

const Button = styled.button`
    display: block;
    width: 100%;
    height: 10%;
    padding: 1rem;
    margin: .5rem auto;
    text-align: center;
    background-color: ${props => props.bgcolor};
    border: 2px solid ${props => props.bgcolor};
    color: ${props => props.color};
    font-size: 1rem;
    font-weight: bold;
`;

const CustomButton = (props) => {
    return (
        <Button bgcolor={props.bgcolor} color={props.color} onClick={props.onClick}>{props.children}</Button>
    )
}

export default CustomButton;
