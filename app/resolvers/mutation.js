/**
 * List of Mutation
 */

const userDatamapper = require("../datamappers/user");
const instrumentDatamapper = require("../datamappers/instrument");
const suitDatamapper = require("../datamappers/suit");
const authService = require("../services/authService");


module.exports = {
	addUser(_, args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return userDatamapper.create(args.input)
		//}
	},
	addInstrument(_, args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return instrumentDatamapper.create(args.input);
	},
	addSuit(_, args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return suitDatamapper.create(args.input);
	},
	deleteSuit(_, { id }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return suitDatamapper.delete(id);
	},
	deleteUser(_, { id }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return userDatamapper.delete(id);
	},
	deleteInstrument(_, { id }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return instrumentDatamapper.delete(id);
	},
	updateSuit(_, { id, input }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return suitDatamapper.update({ id }, input);
	},
	updateUser(_, { id, input }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return userDatamapper.update({ id }, input);
	},
	updateInstrument(_, { id, input }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return instrumentDatamapper.update({ id }, input);
	},
	loginUser(_, { input }) {
		const token = authService.login(input);

		if (token) {
			return {
				token
			};
		}
	}
};
