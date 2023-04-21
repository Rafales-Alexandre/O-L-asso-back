 const context =  async ({ req, res }) => ({ token : await getTokenForRequest(req), });

 module.exports = context