import React, {useCallback, useState} from "react";
import { useHistory } from 'react-router-dom';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useDispatch} from "react-redux";
import useInput from "../../hooks/useInput";
import {CreateGameRoomAction} from "../../module/game";

const CreateRoomModal = ({changeState}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, onChangeTitle] = useInput('');
    const [secret, setSecret] = useState(false);
    const [password, onChangePassword] = useInput('');

    const onCreate = useCallback(
        async (e) => {
            if (title) {
                try {
                    await dispatch(
                        CreateGameRoomAction({
                            title: title,
                            isSecret: secret,
                            password: password,
                        }),
                    );
                    history.push('/GameRoom');
                } catch (err) {
                    console.error("에러:" + err);
                    alert('방 만들기에 실패했습니다');
                }
            } else {
                console.log(title, secret, password);
                alert('입력창을 모두 채워주세요.');
            }
        },
        [title, secret, password],
    );

    const onSecretBoolean = () => {
        setSecret(!secret);
    }

    const onCreateKeyPress = (e) => {
        console.log(e.key);
        if (e.key === 'Enter') {
            onCreate();
        }
    };
    return (
        <>
            <h3>방 만들기</h3>
            <CustomInput value={title} onChange={onChangeTitle} onKeyPress={onCreateKeyPress} placeholder="방 제목"/>
            <input value={secret} placeholder="비밀방" type="checkbox" onClick={onSecretBoolean} defaultChecked={false}/><label>비밀 방</label>
            <CustomInput value={password} onChange={onChangePassword} placeholder="비밀번호" type="password"/>
            <CustomButton bgcolor="#63A4DF" color="#FFFFFF" onClick={onCreate}>만들기</CustomButton>
        </>
    );
};

export default CreateRoomModal;
