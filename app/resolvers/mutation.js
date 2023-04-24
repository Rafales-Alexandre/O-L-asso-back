/**
 * List of Mutation
 */

const userDatamapper = require("../datamappers/user");
const instrumentDatamapper = require("../datamappers/instrument");
const suitDatamapper = require("../datamappers/suit");
const authService = require("../services/authService");
const resetPassword = require("./resetPassword");

module.exports = {
	addUser(_, args) {

		/* ajouter argument context au dessus
		
		if(!context.role == "admin" || "board"){
			console.log("pas bien")
			Throw GraphQlError 
			return null,
		} else { */
		return userDatamapper.create(args.input)
		//}
	},
	addInstrument(_, args) {
		return instrumentDatamapper.create(args.input);
	},
	addSuit(_, args) {
		return suitDatamapper.create(args.input);
	},
	deleteSuit(parent, { id }) {
		return suitDatamapper.delete(id);
	},
	deleteUser(parent, { id }) {
		return userDatamapper.delete(id);
	},
	deleteInstrument(_, { id }) {
		return instrumentDatamapper.delete(id);
	},
	updateSuit(_, { id, input }) {
		return suitDatamapper.update({ id }, input);
	},
	updateUser(_, { id, input }) {
		return userDatamapper.update({ id }, input);
	},
	updateInstrument(_, { id, input }) {
		return instrumentDatamapper.update({ id }, input);
	},
	loginUser(_, { input }) {
		const token = authService.login(input);

		if (token) {
			return {
				token
			};
		}
	},
	resetPassword
};
