import { User } from './../../entity/User';
import * as passport from 'passport';
import local from './localStrategy';
import { getRepository } from 'typeorm';

export default () => {
    passport.serializeUser((user, done) => {
        console.log('serializeUser---------');
        done(null, user.id);
    });

    passport.deserializeUser<number>(async (id, done) => {
        try {
            console.log('deserializeUser---------', id);
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
