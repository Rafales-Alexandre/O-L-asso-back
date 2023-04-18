es (21 sloc) 812 Bytes
const Joi = require("joi");



const simpleFormat = /^[a-zA-Zéèà' -]{2,30}$/;
const emailValidator =/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const passwordValidator = /[a-zA-Z0-9.!#$%&’*+\/=?^_`@{|}~-]+/

/***************************LOGIN */

const loginSchema = Joi.object({
    email:Joi.string().pattern(emailValidator),
    password:Joi.string().pattern(passwordValidator),
    
});

/*************************SIGNING */
const signingSchema = Joi.object({
  firstname: Joi.string().pattern(simpleFormat),
  lastname:Joi.string().max(20),
  email:Joi.string().pattern(emailValidator),
  password:Joi.string().pattern(passwordValidator),
  confirmation : Joi.string().pattern(passwordValidator)
})

module.exports = {
  loginSchema,signingSchema
};