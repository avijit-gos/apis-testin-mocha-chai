/** @format */

const Joi = require("joi");

const TodoSchemaValidation = Joi.object({
  title: Joi.string().required().min(5).max(50),

  description: Joi.string().required().min(5).max(500),
});

module.exports = { TodoSchemaValidation };
