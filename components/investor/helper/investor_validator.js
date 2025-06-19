const Joi = require("joi");

const investorValidation = Joi.object({
  _id: Joi.any().strip(),
  fullName: Joi.string().trim().min(3).max(100).required().messages({
    "any.required": "Full name is required",
    "string.empty": "Full name cannot be empty",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name must be less than 100 characters"
  }),

  dateOfBirth: Joi.date().max('now').required().messages({
    "any.required": "Date of birth is required",
    "date.base": "Date of birth must be a valid date in YYYY-MM-DD format",
    "date.max": "Date of birth cannot be in the future"
  }),

  email: Joi.string().email().trim().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty"
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required",
      "string.empty": "Phone number cannot be empty",
      "string.pattern.base": "Phone number must be 10 digits"
    }),

  telephoneNumber: Joi.string()
    .pattern(/^[0-9]*$/)
    .allow("")
    .messages({
      "string.pattern.base": "Telephone number must be digits only"
    }),

  permanentAddress: Joi.object({
    district: Joi.string().min(3).max(50).required().messages({
      "any.required": "District is required",
      "string.empty": "District cannot be empty",
      "string.min": "District must be at least 3 characters",
      "string.max": "District must be less than 50 characters"
    }),
    wardNo: Joi.number().integer().min(1).max(99).required().messages({
      "any.required": "Ward number is required",
      "number.base": "Ward number must be a number",
      "number.min": "Ward number must be at least 1",
      "number.max": "Ward number must be less than 100"
    }),
    houseNo: Joi.string().max(20).allow("").messages({
      "string.max": "House number must not exceed 20 characters"
    }),
    streetOrTole: Joi.string().min(3).max(100).required().messages({
      "any.required": "Street/Tole is required",
      "string.empty": "Street/Tole cannot be empty",
      "string.min": "Street/Tole must be at least 3 characters",
      "string.max": "Street/Tole must be less than 100 characters"
    }),
    municipalityOrRuralMunicipality: Joi.string().min(3).max(50).required().messages({
      "any.required": "Municipality or rural municipality is required",
      "string.empty": "Municipality or rural municipality cannot be empty",
      "string.min": "Must be at least 3 characters",
      "string.max": "Must be less than 50 characters"
    })
  }).required().messages({
    "object.base": "Permanent address must be an object",
    "any.required": "Permanent address is required"
  }),

  temporaryAddress: Joi.object({
    district: Joi.string().min(3).max(50).required().messages({
      "any.required": "Temporary district is required",
      "string.empty": "Temporary district cannot be empty",
      "string.min": "Temporary district must be at least 3 characters",
      "string.max": "Temporary district must be less than 50 characters"
    }),
    wardNo: Joi.number().integer().min(1).max(99).required().messages({
      "any.required": "Temporary ward number is required",
      "number.base": "Temporary ward number must be a number",
      "number.min": "Temporary ward number must be at least 1",
      "number.max": "Temporary ward number must be less than 100"
    }),
    houseNo: Joi.string().max(20).allow("").messages({
      "string.max": "Temporary house number must not exceed 20 characters"
    }),
    streetOrTole: Joi.string().min(3).max(100).required().messages({
      "any.required": "Temporary street/tole is required",
      "string.empty": "Temporary street/tole cannot be empty",
      "string.min": "Temporary street/tole must be at least 3 characters",
      "string.max": "Temporary street/tole must be less than 100 characters"
    }),
    municipalityOrRuralMunicipality: Joi.string().min(3).max(50).required().messages({
      "any.required": "Temporary municipality or rural municipality is required",
      "string.empty": "Temporary municipality or rural municipality cannot be empty",
      "string.min": "Temporary municipality or rural municipality must be at least 3 characters",
      "string.max": "Temporary municipality or rural municipality must be less than 50 characters"
    })
  }).required().messages({
    "object.base": "Temporary address must be an object",
    "any.required": "Temporary address is required"
  }),

  isSameAsPermanentAddress: Joi.boolean().default(false),

  citizenship: Joi.object({
    number: Joi.string().required().messages({
      "any.required": "Citizenship number is required",
      "string.empty": "Citizenship number cannot be empty"
    }),
    issuedDate: Joi.date().max('now').required().messages({
      "any.required": "Citizenship issued date is required",
      "date.base": "Issued date must be a valid date in YYYY-MM-DD format",
      "date.max": "Issued date cannot be in the future"
    }),
    issuedDistrict: Joi.string().required().messages({
      "any.required": "Citizenship issued district is required",
      "string.empty": "Citizenship issued district cannot be empty"
    })
  }).required(),

  nationalIdNumber: Joi.string().required().messages({
    "any.required": "National ID number is required",
    "string.empty": "National ID number cannot be empty"
  }),

  panDetails: Joi.object({
    panNumber: Joi.string().required().messages({
      "any.required": "PAN number is required",
      "string.empty": "PAN number cannot be empty"
    }),
    dematNumber: Joi.string().required().messages({
      "any.required": "Demat number is required",
      "string.empty": "Demat number cannot be empty"
    })
  }).required(),

  shareDetails: Joi.object({
    agreedAmount: Joi.number().required().messages({
      "any.required": "Agreed amount is required",
      "number.base": "Agreed amount must be a number"
    }),
    depositedAmount: Joi.number().required().messages({
      "any.required": "Deposited amount is required",
      "number.base": "Deposited amount must be a number"
    }),
    depositedDate: Joi.date().required().messages({
      "any.required": "Deposited date is required",
      "date.base": "Deposited date must be a valid date"
    }),
    source: Joi.string().required().messages({
      "any.required": "Source is required",
      "string.empty": "Source cannot be empty"
    }),
    remarks: Joi.string().max(300).allow("")
  }).required(),

  family: Joi.object({
    spouseName: Joi.string().min(2).max(100).allow("").messages({
      "string.min": "Spouse name must be at least 2 characters",
      "string.max": "Spouse name must be less than 100 characters"
    }),
    fatherName: Joi.string().min(2).max(100).required().messages({
      "any.required": "Father's name is required",
      "string.empty": "Father's name cannot be empty",
      "string.min": "Father's name must be at least 2 characters",
      "string.max": "Father's name must be less than 100 characters"
    }),
    motherName: Joi.string().min(2).max(100).required().messages({
      "any.required": "Mother's name is required",
      "string.empty": "Mother's name cannot be empty",
      "string.min": "Mother's name must be at least 2 characters",
      "string.max": "Mother's name must be less than 100 characters"
    }),
    grandfatherName: Joi.string().min(2).max(100).required().messages({
      "any.required": "Grandfather's name is required",
      "string.empty": "Grandfather's name cannot be empty",
      "string.min": "Grandfather's name must be at least 2 characters",
      "string.max": "Grandfather's name must be less than 100 characters"
    }),
    grandmotherName: Joi.string().min(2).max(100).required().messages({
      "any.required": "Grandmother's name is required",
      "string.empty": "Grandmother's name cannot be empty",
      "string.min": "Grandmother's name must be at least 2 characters",
      "string.max": "Grandmother's name must be less than 100 characters"
    }),
    sonName: Joi.string().min(2).max(100).allow("").messages({
      "string.min": "Son's name must be at least 2 characters",
      "string.max": "Son's name must be less than 100 characters"
    }),
    daughterName: Joi.string().min(2).max(100).allow("").messages({
      "string.min": "Daughter's name must be at least 2 characters",
      "string.max": "Daughter's name must be less than 100 characters"
    }),
    daughterInLaw: Joi.string().min(2).max(100).allow("").messages({
      "string.min": "Daughter-in-law's name must be at least 2 characters",
      "string.max": "Daughter-in-law's name must be less than 100 characters"
    }),
    fatherInLaw: Joi.string().min(2).max(100).allow("").messages({
      "string.min": "Father-in-law's name must be at least 2 characters",
      "string.max": "Father-in-law's name must be less than 100 characters"
    })
  }).optional(),

  jobs: Joi.array().items(
    Joi.object({
      companyName: Joi.string().min(2).max(100).required().messages({
        "any.required": "Company name is required",
        "string.empty": "Company name cannot be empty",
        "string.min": "Company name must be at least 2 characters",
        "string.max": "Company name must be less than 100 characters"
      }),
      address: Joi.string().min(2).max(200).required().messages({
        "any.required": "Job address is required",
        "string.empty": "Job address cannot be empty",
        "string.min": "Job address must be at least 2 characters",
        "string.max": "Job address must be less than 200 characters"
      }),
      position: Joi.string().min(2).max(100).required().messages({
        "any.required": "Job position is required",
        "string.empty": "Job position cannot be empty",
        "string.min": "Job position must be at least 2 characters",
        "string.max": "Job position must be less than 100 characters"
      }),
      remarks: Joi.string().max(300).allow("").messages({
        "string.max": "Remarks must be less than 300 characters"
      })
    })
  ).min(1).required().messages({
    "array.base": "Jobs must be an array",
    "array.min": "At least one job entry is required",
    "any.required": "Jobs field is required"
  }),

  documents: Joi.object({
    passportPhoto: Joi.string().required().messages({
      "any.required": "Passport photo is required",
      "string.empty": "Passport photo cannot be empty"
    }),
    verifyingDocuments: Joi.array().items(Joi.string()).min(1).max(5).required().messages({
      "any.required": "At least one verifying document is required",
      "array.min": "Minimum 1 verifying document is required",
      "array.max": "No more than 5 verifying documents allowed"
    })
  }).required(),

  status: Joi.string().valid("pending", "approved", "rejected"),
  updatedBy: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .allow(null)
    .messages({
      "string.pattern.base": `"updatedBy" must be a valid ObjectId`,
      "string.base": `"updatedBy" must be a string`,
    })
}); 

module.exports = investorValidation;
