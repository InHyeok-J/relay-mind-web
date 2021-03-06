import React, { useCallback, useState } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction, signUpCleanAction } from '../../module/user';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { checkValidation } from '../../utils/RegExpCheck';

const RegisterModal = ({ changeState }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.user);
    const [id, , setId] = useInput(null);
    const [password, , setPassword] = useInput(null);
    const [passwordCheck, , setPasswordCheck] = useInput(null);
    const [nickname, onChangeNickname] = useInput(null);
    const [errorId, setErrorId] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);
    const [lastIdCheck, setLastIdCheck] = useState(false);
    const [lastPasswordCheck, setLastPasswordCheck] = useState(false);

    const onChangeId = useCallback(
        (e) => {
            setId(e.target.value);
            setLastIdCheck(false);
            if (!checkValidation(e.target.value)) {
                setErrorId((pre) => true);
            } else {
                setErrorId(() => false);
            }
        },
        [id],
    );

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
            setLastPasswordCheck(false);
            if (!checkValidation(e.target.value)) {
                setErrorPassword((pre) => true);
            } else {
                setErrorPassword(() => false);
            }

            if (e.target.value === passwordCheck) {
                setErrorPasswordCheck(false);
            } else {
                setErrorPasswordCheck(true);
            }
        },
        [password, passwordCheck],
    );

    const onChangePasswordCheck = useCallback(
        (e) => {
            setLastPasswordCheck(false);
            setPasswordCheck(e.target.value);
            if (password === e.target.value) {
                setErrorPasswordCheck(false);
            } else {
                setErrorPasswordCheck(true);
            }
        },
        [passwordCheck, password],
    );

    const onSignUp = async (e) => {
        if (errorId) {
            return setLastIdCheck(true);
        }
        if (errorPassword || errorPasswordCheck) {
            return setLastPasswordCheck(true);
        }
        if (id && nickname && password) {
            try {
                await dispatch(
                    signUpAction({
                        userId: id,
                        nickname,
                        password,
                    }),
                );
                alert('??????????????? ??????????????????. ?????? ?????????????????????.');
                changeState();
            } catch (err) {
                alert(error.response.data.message);
            }
        } else {
            return alert('?????? ??????????????????');
        }
    };
    const onSignUpKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSignUp();
        }
    };

    return (
        <>
            <h3>????????????</h3>
            <CustomInput
                value={id || ''}
                onChange={onChangeId}
                placeholder="?????????"
                required
            />
            {lastIdCheck ? (
                <GuideText color="red">
                    ???????????? 6~20??? ????????? ??????+?????????????????????.
                </GuideText>
            ) : (
                <GuideText>
                    ???????????? 6~20??? ????????? ??????+?????????????????????.
                </GuideText>
            )}
            <CustomInput
                value={password || ''}
                onChange={onChangePassword}
                placeholder="????????????"
                type="password"
                required
            />
            <GuideText>??????????????? 6~20??? ????????? ??????+?????????????????????.</GuideText>
            <CustomInput
                value={passwordCheck || ''}
                onChange={onChangePasswordCheck}
                placeholder="???????????? ??????"
                type="password"
                required
            />
            {lastPasswordCheck && (
                <GuideText color="red">??????????????? ?????? ??????????????????.</GuideText>
            )}
            <CustomInput
                value={nickname || ''}
                onChange={onChangeNickname}
                placeholder="?????????"
                onKeyPress={onSignUpKeyPress}
                required
            />
            <GuideText>
                ???????????? ???????????? ????????? ???????????? ????????? ??? ?????????, <br />{' '}
                ????????? ?????? ????????? ????????? ?????? ??? ????????????.
            </GuideText>
            <CustomButton bgcolor="#63A4DF" color="#FFFFFF" onClick={onSignUp}>
                ??????
            </CustomButton>
        </>
    );
};

export default RegisterModal;

const GuideText = styled.p`
    color: ${(props) => props.color || '#cccccc'};
    font-size: 0.8rem;
`;
