import { User } from './../../entity/User';
import { getRepository } from 'typeorm';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import * as passport from 'passport';

export default () => {
    passport.use(
        'local',
        new Strategy(
            {
                usernameField: 'userId',
                passwordField: 'password',
            },
            async (userId: string, password: string, done) => {
                try {
                    const userRepository = getRepository(User);
                    const user: Promise<User> | any =
                        await userRepository.findOne({
                            where: { userId },
                        });
                    if (!user) {
                        return done(null, false, {
                            message: '존재하지 않는 유저입니다.',
                        });
                    } else {
                        const result = await user.checkPasswordMatch(password);
                        return result
                            ? done(null, user)
                            : done(null, false, {
                                  message: '비밀번호가 일치하지 않습니다.',
                              });
                    }
                } catch (err) {
                    done(err);
                }
            }
        )
    );
};
