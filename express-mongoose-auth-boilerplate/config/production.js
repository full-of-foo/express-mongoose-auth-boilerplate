export default {
    isSeeded: false,
    logArgs: ['combined'],
    dbUri: 'mongo/express-mongoose-auth-boilerplate',
    dbOptions: {},
    secret: process.env.SECRET_TOKEN,
    tokenDayLife: 14,
};
