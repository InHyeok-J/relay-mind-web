import React, {useCallback, useState} from "react";
import styled from 'styled-components';
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

function LoginRegister() {
    const [register, setRegister] = useState(false);

    const onSetRegisterTrue = () => setRegister(true);
    const onSetRegisterFalse = () => setRegister(false);

    if (!register)
        return (
            <Modal>
                <LoginModal changeState={onSetRegisterTrue}/>
            </Modal>
        );
    else
        return (
            <Modal>
                <RegisterModal changeState={onSetRegisterFalse}/>
            </Modal>
        );
}

function MainModal() {
    return (
        <LoginRegister/>
    );
}

export default MainModal;

const Modal = styled.div`
    display: block;
    min-width: 20vw;
`
