const Joi = require("joi");

const investorValidation = Joi.object({
  fullname: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Fullname is required",
    "string.min": "Fullname must be at least 5 characters",
    "string.max": "Fullname must not exceed 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  phone: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Phone no. is required",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending")
    .messages({
      "string.valid": "Status must be either 'pending', 'approved' or 'rejected'",
    }),
  address: Joi.object({
    street: Joi.string().required().messages({
      "string.empty": "Street is required",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
    }),
    zipCode: Joi.string().required().messages({
      "string.empty": "Zip code is required",
    }),
  }).required().messages({
    "object.base": "Address must be an object",
  }),
});

module.exports = investorValidation;
