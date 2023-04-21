const jwt = require("jsonwebtoken");
const userDatamapper = require ("../datamappers/user");
const { GraphQLError } = require("graphql");

const authService = {
	async login({email, password}) {
    const user  = await userDatamapper.findByEmail(email);

    if(user.password !== password) {
      return false;
    }

    // TODO process.env secret
    const token = jwt.sign({user}, 'olasso', {expiresIn: '7h'});

    return token;
  },
  isLoggedIn(context) {
		//authService.ensureThatUserIsAdmin();
		const user = context.user;

		if(!user) {
			throw new GraphQLError("You are not logged in.", {
				extensions: {
					code: "FORBIDDEN",
				},
			});
		}

		return true;
	},
  isRole(roles, context) {
    this.isLoggedIn(context);

    const user = context.user;

    if(!roles.includes(user.role)) {
      throw new GraphQLError("You are not allowed to access this resource", {
				extensions: {
					code: "FORBIDDEN",
				},
			});
    }

    return true;
  },
  tokenToMe(token){
    console.log(token)
  }
};


module.exports = authService;