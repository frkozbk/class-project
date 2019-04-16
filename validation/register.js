const Validator = require("validator");
const _ = require("lodash");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !_.isEmpty(data.name) ? data.name : "";
  data.email = !_.isEmpty(data.email) ? data.email : "";
  data.password = !_.isEmpty(data.password) ? data.password : "";
  data.password2 = !_.isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    console.log(_.isEmpty(data.name));
    errors.name = "İsim alanı doldurulmalıdır";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Mail alanı doldurulmalıdır.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Girilen email geçersizdir.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Şifre alanı doldurulmalıdır.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Şifreniz en az 6 karakterden oluşmalıdır.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Şifrenizi tekrar girmelisiniz.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Şifreler eşleşmelidir.";
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
};
