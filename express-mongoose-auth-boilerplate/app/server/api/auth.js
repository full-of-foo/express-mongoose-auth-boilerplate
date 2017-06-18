import {Router} from 'express';
import {User} from '../../models';
import UserAuthenticator from '../../lib/UserAuthenticator';
import {generateToken} from '../../lib/authToken';

const authRouter = Router();
const _respondWithInvalid = res => res.status(422).send({});

authRouter.route('/login/')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) _respondWithInvalid(res);

        User.findOne({email: email}).exec()
            .then(user => {
                const isValid = user && new UserAuthenticator(user).authenticate(password);
                if(!isValid) return _respondWithInvalid(res);

                res.status(201).send({token: generateToken(user._id)});
            })
            .error(err => _respondWithInvalid(res));
    });

export default authRouter;
