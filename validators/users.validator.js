const Joi = require("joi");

const userAddSchema = Joi.object({
  firstname: Joi.string().max(255).trim().required(),
  lastname: Joi.string().max(255).required().trim(),
  username: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: { type: String, required: true },
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // repeat_password: Joi.ref('password'),
  // email: Joi.string().required(),
  // dob: Joi.date().greater("1-1-1900").less("1-1-2022").required(),
  // country: Joi.string().optional(),
  // books: Joi.array().items(Joi.string()).optional(),
});

const UpdateUserSchema = Joi.object({
  firstname: Joi.string().min(3).max(255).trim(),
  lastname: Joi.string().min(3).max(255).trim(),
  username: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

async function addUserValidationMiddleware(req, res, next) {
  const userPayLoad = req.body;

  try {
    await userAddSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updateUserValidationMiddleware(req, res, next) {
  const userPayLoad = req.body;

  try {
    await UpdateUserSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  addUserValidationMiddleware,
  updateUserValidationMiddleware,
};
