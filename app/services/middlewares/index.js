const {setupSession, addUserToLocals} = require('./sessionMiddleware');
const { isLoggedIn, isAdmin, isBureau, IsUser} = require ('./rightsMiddleware');
const {loginSchema, signingSchema } = require ('./schemas');


module.exports = {
    setupSession,
    addUserToLocals,
    isLoggedIn,
    isAdmin,
    isBureau,
    IsUser,
    loginSchema,
    signingSchema
};

