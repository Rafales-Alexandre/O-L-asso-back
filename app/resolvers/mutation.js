/**
 * List of Mutation based on the gql file
 */

const userDatamapper = require("../datamappers/user");
const instrumentDatamapper = require("../datamappers/instrument");
const suitDatamapper = require("../datamappers/suit");
const authService = require("../services/authService");
const resetPasswordDatamapper = require("../datamappers/resetPassword");
const passwordDatamapper = require ("../datamappers/password");
const bcrypt = require("../services/bcrypt");

module.exports = {
	addUser(_, args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return userDatamapper.createBcrypt(args.input);
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
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.update({ id }, input);
	},
	updateInstrument(_, { id, input }, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return instrumentDatamapper.update({ id }, input);
	},
	loginUser(_, { input }) {
		return authService.login(input.email, input.password);
		
	},
	resetPassword(_, { newPassword }, contextValue) {
		authService.isRole(["admin"], contextValue);
		return resetPasswordDatamapper.resetPassword(_, { newPassword });
	},
	updatePassword(_, { input }, contextValue){
		console.log({input});
		authService.isRole(["board", "admin", "member"], contextValue);
		return passwordDatamapper.updatePassword(input.id, input.newPassword);
	},
	updateUserImage(_, { id, image }, contextValue) {
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.updateImage({ id }, image);
	}
};