import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import useInput from '../../hooks/useInput';
import { checkGamePasswordAction } from '../../module/game';

const PasswordCheckModal = ({ roomNumber }) => {
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const history = useHistory();

    const onCheck = useCallback(async () => {
        try {
            dispatch(
                checkGamePasswordAction({
                    gameId: roomNumber,
                    password,
                }),
            );
            alert('패스워드 일치!');
            history.push('/gameRoom');
        } catch (err) {
            console.error(err);
            alert('패스워드 불일치!');
        }
    }, [password]);
    return (
        <div>
            <h3>비밀번호 입력</h3>
            <CustomInput
                value={password}
                onChange={onChangePassword}
                placeholder="비밀번호"
                type="password"
            />
            <CustomButton bgcolor="#63A4DF" color="#FFFFFF" onClick={onCheck}>
                입력
            </CustomButton>
        </div>
    );
};

export default PasswordCheckModal;
