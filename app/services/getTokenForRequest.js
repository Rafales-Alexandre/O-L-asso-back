/* eslint-disable quotes */
/**
 * method to push the token in the header,, using a look alike method of the Bearer 
 * @param {*} req 
 * @returns 
 */

function getTokenForRequest(req) {
  console.log("req.header: ", req.header);
	return req.header('Authorization');
}

module.exports = getTokenForRequest;