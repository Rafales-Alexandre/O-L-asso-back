const session = require('express-session');
/* const { Role } = require("./Models/Role"); */

/**
 *  !secret is deprecated, need to find alternative!
 * First, I create the session and his little cookies 
 */
const setupSession = session({
    secret : process.env.TOKEN_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie : { secure: false}

});

/**
 * Function to Add the user and his infiormations to Locals, so I can authorize or no chat he will see
 * @param {*} req: I request what's his role after he logged in 
 * @param {*} res : I send this value to the locals , before I sens anything to see !
 * @param {*} next : I go to the next operation
 */
async function addUserToLocals(req,res,next){
    const roleId = req.session.roleId;
    req.session.role = role;
    res.locals.role= role;
    next()
}

module.exports = {
    setupSession,
    check,
    securityService,
    addUserToLocals
}
