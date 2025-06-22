const Joi = require("joi");

const subscriberValidation = Joi.object({
  email: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')) 
    .required() 
    .trim()  
    .lowercase()  
    .messages({
      "string.empty": "Email is required",  
      "string.pattern.base": "Please provide a valid email address",  
    }),

    status: Joi.string()
    .valid("read", "unread", "pending")
    .default("pending")
    .messages({
      "any.only": "Status must be one of: read, unread, or pending"
    })
});

module.exports = subscriberValidation;
