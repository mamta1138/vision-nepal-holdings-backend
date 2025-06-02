const Joi = require("joi");

const investorValidation = Joi.object({
  fullname: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Fullname is required",
    "string.min": "Fullname must be at least 5 characters",
    "string.max": "Fullname must not exceed 100 characters",
  }),
  email: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Email is required",
  }),
  phone: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Phone no. is required",
  }),
  status: Joi.string()
    .valid("pending", "approved")
    .default("pending")
    .messages({
      "string.valid": "Status must be either 'pending' or 'approved'",
    }),
});

module.exports = investorValidation;
