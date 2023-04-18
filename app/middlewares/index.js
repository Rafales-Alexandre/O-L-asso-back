const {setupSession, addUserToLocals} = require('./sessionMiddleware');
const { isLoggedIn, isAdmin, isBureau, IsUser} = require ('./rightsMiddleware');

module.exports = {
    setupSession,
    addUserToLocals,
    isLoggedIn,
    isAdmin,
    isBureau,
    IsUser
};

