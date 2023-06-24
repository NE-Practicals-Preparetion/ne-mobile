const Joi = require('joi');

function validatePurchase(purchase) {
  // Define your validation schema using Joi
  const schema = Joi.object({
    meterNumber: Joi.string().length(6).required(),
    amount: Joi.number().integer().min(100).max(500 * 365).required(),
  });

  return schema.validate(purchase);
}

module.exports = {
  validatePurchase,
};
