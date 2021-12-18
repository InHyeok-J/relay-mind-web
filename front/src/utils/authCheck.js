import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router';
import { getUserAction } from '../module/user';

export default function Auth(SpecificComponent, check) {
    function AuthCheck() {
        const dispatch = useDispatch();
        const history = useHistory();
        const { user } = useSelector((state) => state.user);
        useEffect(async () => {
            try {
                await dispatch(getUserAction());
            } catch (err) {
                if (check) {
                    alert('로그인이 필요합니다.');
                    history.push('/');
                }
            }
        }, []);

        if (!user && check) return null;
        return <SpecificComponent />;
    }
    return AuthCheck;
}
