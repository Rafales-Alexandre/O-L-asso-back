/* const session = require('express-session');

/**
 * EN COURS DE TEST 
 * Utiliser le schéma du User donc définir un User type/role 
const { User } = require("../")
 */

const setupSession = session({
    secret : process.env.TOKEN_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie : { secure: false}

});

async function addUserToLocals(req,res,next){
    const userId = req.session.userId;
    /** Celon le modèle choisit pour l'authificatiçon/les roles ; 
     * const user = await User.findByPK(userId, {attributes: {exclude: "password"}})
     */
    req.session.user = user;
    res.locals.user= user;
    next();
}

module.exports = {
    setupSession,
    addUserToLocals
}
