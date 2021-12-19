import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postKeyword } from '../../api/gameApi';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import useInput from '../../hooks/useInput';
import { getGameInfoAction, postKeywordAction } from '../../module/game';

const KeywordSendModal = ({ setModalState, roomId, phase }) => {
    const [keyword, onChangeKeyword] = useInput('');
    const dispatch = useDispatch();
    const { socket } = useSelector((state) => state.socket);
    const { postkeyword } = useSelector((state) => state.game);
    const [delay, setDelay] = useState(false);

    const onClickSend = async () => {
        try {
            await dispatch(postKeywordAction({ keyword, roomId, phase })).then(
                (response) => {
                    console.log(response);
                },
            );
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (postkeyword && postkeyword.message === 'delay') {
            setDelay(true);
        } else if (postkeyword && postkeyword.message === 'success') {
            setDelay(false);
        }
    }, [postkeyword]);

    return (
        <>
            {delay ? (
                <div>다른 사람이 입력중입니다.</div>
            ) : (
                <>
                    <h3>키워드를 입력하세요</h3>
                    <CustomInput
                        value={keyword}
                        onChange={onChangeKeyword}
                        placeholder="키워드"
                    />
                    <CustomButton
                        bgcolor="#63A4DF"
                        color="#FFFFFF"
                        onClick={onClickSend}
                    >
                        전송
                    </CustomButton>{' '}
                </>
            )}
        </>
    );
};

export default KeywordSendModal;
