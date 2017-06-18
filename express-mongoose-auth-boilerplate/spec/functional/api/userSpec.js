import request from 'request-promise';
import constants from '../../support/helpers/constants';
import userFactory from '../../support/helpers/userFactory';
import {generateToken} from '../../../app/lib/authToken';
import {jasmineErrorHandler} from '../../support/helpers/error';

const expectedAttrs = ['_id', 'updatedAt', 'createdAt', 'email', 'password'];
let defaultReqOpts = {json: true};

describe('API: user', () => {
    beforeEach(done => {
        userFactory.create()
            .then(user => {
                const token = generateToken(user._id);
                defaultReqOpts = Object.assign(defaultReqOpts, new Object({auth: {bearer: token}}));
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET all', done => {
        const reqOpts = Object.assign({uri: `${constants.baseUrl}/api/user`}, defaultReqOpts);

        request(reqOpts)
            .then(users => expect(users.length).toEqual(1))
            .then(() => userFactory.create())
            .then(user => request(reqOpts))
            .then(users => {
                expect(users.length).toEqual(2);
                expect(Object.keys(users[1])).toEqual(expectedAttrs);
            })
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET one', done => {
        userFactory.create()
            .then(user => request(Object.assign({uri: `${constants.baseUrl}/api/user/${user._id}`}, defaultReqOpts)))
            .then(user => expect(Object.keys(user)).toEqual(expectedAttrs))
            .catch(err => jasmineErrorHandler(err, done))
            .finally(done);
    });

    it('should be able to GET 404s', done => {
        const _assertResNotFound = res => {
            return new new Promise((resolve, reject) => {
                expect(res.statusCode).toEqual(404);
                expect(res.data).toEqual({});
            });
        };
        const _reqUser = id => {
            const opts = {uri: `${constants.baseUrl}/api/user/${id}`, resolveWithFullResponse: true};
            const fullReqOpts = Object.assign(opts, defaultReqOpts);
            return request(fullReqOpts);
        };

        _reqUser('123')
            .then(res => _assertResNotFound(res))
            .then(() => _reqUser('59469241a5129e000fbe8d61'))
            .then(res => _assertResNotFound(res))
            .then(() => _reqUser('123'))
            .then(res => _assertResNotFound(res))
            .finally(done);
    });
});
