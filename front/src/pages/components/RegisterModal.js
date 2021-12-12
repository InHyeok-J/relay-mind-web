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
                alert('회원가입에 성공했습니다. 다시 로그인해주세요.');
                changeState();
            } catch (err) {
                alert(error.response.data.message);
            }
        } else {
            return alert('값을 입력해주세요');
        }
    };
    const onSignUpKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSignUp();
        }
    };

    return (
        <>
            <h3>회원가입</h3>
            <CustomInput
                value={id || ''}
                onChange={onChangeId}
                placeholder="아이디"
                required
            />
            {lastIdCheck ? (
                <GuideText color="red">
                    아이디는 6~20자 사이의 영문+숫자여야합니다.
                </GuideText>
            ) : (
                <GuideText>
                    아이디는 6~20자 사이의 영문+숫자여야합니다.
                </GuideText>
            )}
            <CustomInput
                value={password || ''}
                onChange={onChangePassword}
                placeholder="비밀번호"
                type="password"
                required
            />
            <GuideText>비밀번호는 6~20자 사이의 영문+숫자여야합니다.</GuideText>
            <CustomInput
                value={passwordCheck || ''}
                onChange={onChangePasswordCheck}
                placeholder="비밀번호 확인"
                type="password"
                required
            />
            {lastPasswordCheck && (
                <GuideText color="red">비밀번호를 다시 확인해주세요.</GuideText>
            )}
            <CustomInput
                value={nickname || ''}
                onChange={onChangeNickname}
                placeholder="닉네임"
                onKeyPress={onSignUpKeyPress}
                required
            />
            <GuideText>
                부적절한 닉네임은 별도의 안내없이 변경될 수 있으며, <br />{' '}
                원활한 게임 이용에 제한을 받을 수 있습니다.
            </GuideText>
            <CustomButton bgcolor="#63A4DF" color="#FFFFFF" onClick={onSignUp}>
                확인
            </CustomButton>
        </>
    );
};

export default RegisterModal;

const GuideText = styled.p`
    color: ${(props) => props.color || '#cccccc'};
    font-size: 0.8rem;
`;
