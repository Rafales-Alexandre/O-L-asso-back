/**
 * List of Mutation
 */

const userDatamapper = require("../datamappers/user");
const instrumentDatamapper = require("../datamappers/instrument");
const suitDatamapper = require("../datamappers/suit");
const authService = require("../services/authService");
const resetPasswordDatamapper = require("../datamappers/resetPassword");

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
		//const token = authService.login(input);
			
		/* const result = [];
		async function getUser(param) {
			const user = await userDatamapper.findByEmail(param);
			
			return user.rows;
			console.log(user.email);
			console.log(user.id);

			
		};

		getUser(input.email);

		console.log("user id ", user.id); */

		/* 	async ({input})=>{

			let input = await userDatamapper.findByEmail(input.email);
			const id = input.id;
			const url_img = input.url_img;
			const lastname = input.lastname;
			const firstname = input.firstname;
			const nickname = input.nickname;
			const birthdate = input.birthdate;
			const phone = input.phone;
			const address = input.address;
			const address_2 = input.address_2;
			const zip_code = input.zip_code;
			const city = input.city;
			const gender = input.gender;
			const top_size = input.top_size;
			const bottom_size = input.bottom_size;
			const subscription = input.subscription;
			const deposit = input.deposit;
			const role = input.role;




			const user = {
			 id: input.id,
			 url_img: input.url_img,
			lastname : input.lastname,
			firstname = input.firstname,
			nickname = input.nickname,
			birthdate = input.birthdate,
			phone = input.phone,
			address = input.address,
			address_2 = input.address_2,
			zip_code = input.zip_code,
			city = input.city,
			gender = input. gender,
			top_size = input.top_size,
			bottom_size = input.bottom_size,
			subscription = input.subscription,
			deposit = input.deposit,
			role = input.role,
			 }
			};
			
			id,
				url_img,
				lastname,
				firstname,
				nickname,
				birthdate,
				phone,
				address,
				address_2,
				zip_code,
				city,
				gender,
				top_size,
				bottom_size,
				subscription,
				deposit,
				role
			*/
			
		
			return authService.login(input.email, input.password);
		
	},
	resetPassword(_, { token, newPassword }, contextValue) {
		authService.isRole(["admin"], contextValue);
		return resetPasswordDatamapper.resetPassword(_, { token, newPassword });
	}
};
