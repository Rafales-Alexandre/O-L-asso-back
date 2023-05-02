/**
 * Returns the token from the `Authorization` header of the HTTP request.
 * @function getTokenForRequest
 * @param {Object} req - The HTTP request object.
 * @returns {string|undefined} - The token string if present in the header, otherwise `undefined`.
 */

function getTokenForRequest(req) {
 
	return req.header("Authorization");
}

module.exports = getTokenForRequest;