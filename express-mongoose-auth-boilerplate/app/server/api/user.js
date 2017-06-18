import {Router} from 'express';
import {User, mongoose} from '../../models';

const userRouter = Router();
const ValidationError = mongoose.Error.ValidationError;
const CastError = mongoose.Error.CastError;

userRouter.route('/')
    .get((req, res) => {
        User.find({}).sort('-createdAt').exec()
            .then(users => res.send(users))
            .error(err => res.status(500).send(err));
    })
    .post((req, res) => {
        User.create(req.body)
            .then(user => res.status(201).send(user))
            .catch(ValidationError, err => res.status(422).send(err))
            .error(err => res.status(500).send(err));
    });
userRouter.route('/:id')
    .get((req, res) => {
        User.findOne({_id: req.params.id}).exec()
            .then(user => {
                if(!user) res.status(404).send({});
                res.send(user);
            })
            .catch(CastError, err => res.status(404).send({}))
            .error(err => res.status(500).send(err));
    })
    .put((req, res) => {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).exec()
            .then(user => user ? res.send(user): res.status(404).send({}))
            .catch(CastError, err => res.status(404).send({}))
            .catch(ValidationError, err => res.status(422).send(err))
            .error(err => res.status(500).send(err));
    });

export default userRouter;
