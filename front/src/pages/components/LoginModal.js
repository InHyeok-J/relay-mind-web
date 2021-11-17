import shortLogo from "../../assets/RM_ShortLogo.png";
import React, {useCallback, useState} from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {loginAction} from "../../module/user";
import {useDispatch} from "react-redux";
import useInput from "../../hooks/useInput";

const LoginModal = ({changeState}) => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onLogin = useCallback(
        async (e) => {
            if (id && password) {
                try {
                    await dispatch(
                        loginAction({
                            userId: id,
                            password,
                        }),
                    );
                    alert('로그인 성공!');
                } catch (err) {
                    console.error("에러:" + err);
                    alert('로그인에 실패했습니다!');
                }
            } else {
                console.log(id, password);
                alert('입력창을 모두 채워주세요.');
            }
        },
        [id, password],
    );

    return (
        <>
            <img src={shortLogo} alt="shortLogo" style={ShortLogo}/>
            <CustomInput value={id} onChange={onChangeId} placeholder="아이디"/>
            <CustomInput value={password} onChange={onChangePassword} placeholder="비밀번호" type="password"/>
            <CustomButton bgcolor="#63A4DF" color="#FFFFFF" onClick={onLogin}>로그인</CustomButton>
            <CustomButton bgcolor="#FFFFFF" color="#63A4DF" onClick={changeState}>회원가입</CustomButton>
        </>
    );
};
/*
<CustomButton bgcolor="#F9E000" color="#3b1e1e">카카오 로그인</CustomButton>
<CustomButton bgcolor="#F65314" color="#FFFFFF">Google 로그인</CustomButton>
*/
export default LoginModal;

const ShortLogo = {
    display: "block",
    width: "10vw",
    margin: "3rem auto",
}
