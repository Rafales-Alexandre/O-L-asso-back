const securityService = {
    /**
 * Function to checked up the value of the user 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
   async function check(req, res, next) {
    if (req.session.user && req.session.user.role == "admin"||"board"||"member") {

        next();
    }
    else {
        // sinon redirect vers une autre page... 
        res.redirect("/");
    }
}
}
;


module.exports = securityService; 