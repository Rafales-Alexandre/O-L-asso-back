const APIError = require("../error/APIerror")

function isLoggedIn(req, res, next){
    if(!req.session.user){
       next( new APIError(error.message, 401))
    } next();
}
/**
 * need to verify if it goes through every path of verification of status.role 
*/
function isUser(){
    if(!req.session.user){
        next( new APIError(error.message, 401));
    }
    // elseif ?
    if(req.session.user.role !== "User"){
        return res.json('Bienvenue Utilisateur')
        
    } else {
        next()
    }
}

function isBureau(req, res, next){
    if(!req.session.user){
        next( new APIError(error.message, 401));
    } 
    if(req.session.user.role !== "desk"){
        return res.json('Utilisateur de rang Bureau')
    }else {
        next()
    }
};

function isAdmin(){
    if(!req.session.user){
        next( new APIError(error.message, 401));
    }
    if(req.session.user.role !== "Admin"){
        return res.json('Gloire à l\'Administrateur')
    }
};

/**
 * it may appear to be more effective to have all of this in One big function 
 */
module.export = {isLoggedIn, isBureau, isUser, isAdmin};