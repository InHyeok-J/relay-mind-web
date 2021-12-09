import styled from "styled-components";
import React from "react";

const Input = styled.input`
    display: block;
    width: 20vw;
    height: 10%;
    padding: 1rem;
    margin: .5rem auto;
    border-radius: 4px;
    border: 1px solid #cccccc;
`;

const CustomInput = (props) => {
    return (
        <Input
            value={props.value}
            placeholder={props.placeholder}
            type={props.type}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
        />
    );
};

export default CustomInput;
