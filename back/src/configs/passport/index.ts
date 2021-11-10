import { User } from './../../entity/User';
import * as passport from 'passport';
import local from './localStrategy';
import { getRepository } from 'typeorm';

export default () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser<number>(async (id, done) => {
        try {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ where: { id } });
            if (!user) {
                return done(new Error('no user'));
            }
            return done(null, user); // req.user
        } catch (err) {
            console.error(err);
            return done(err);
        }
    });
    local();
};
