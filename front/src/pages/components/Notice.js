import styled from 'styled-components';
import React from "react";

const NoticeBox = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    color: #FFFFFF;
    width: 80%;
    margin: 1rem auto;
    padding: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    border: 1px dashed #FFFFFF;
    border-radius: 10px;
`

function Notice({content}) {
    return(
        <NoticeBox>
            주제는 "{content}"
        </NoticeBox>
    )
}

export default Notice;
