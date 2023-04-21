function getTokenForRequest(req) {
  return req.header('Authorization');
}

module.exports = getTokenForRequest;