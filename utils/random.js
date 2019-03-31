const chance = require("chance").Chance();

module.exports = function randomstring() {
  var pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var random = chance.string({ pool, length: 5 });
  return random;
};
