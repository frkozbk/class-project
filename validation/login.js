const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Mail geçersizdir.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Mail alanı doldurulmalıdır.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Şifre alanı doldurulmalıdır.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
