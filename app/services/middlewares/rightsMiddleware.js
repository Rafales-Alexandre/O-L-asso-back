const erroHandler = require ("../error/errorHandler");
const APIError = require("../error/APIerror")

function isLoggedIn(req, res, next){
    if(!req.session.user){
        return erroHandler
    } next();
}
/**
 *  Those may be very useless. 
 * 
 */
function isBureau(){
    if(!req.session.user){
        return errorHandler
    } 
    if(req.session.user.role !== "Bureau"){}
};

function isAdmin(){
    if(!req.session.user){
        errorHandler
    }
    if(req.session.user.role !== "Admin"){}
};

function isUser(){
    if(!req.session.user){
        errorHandler
    }
    if(req.session.user.role !== "User"){}
};

module.export = {isLoggedIn, isBureau, isUser, isAdmin};