const UpsErrors = require("./UpsErrors");
const ctrlWraper = require('./ctrlWrapper');
const mongooseErr = require('./mongooseErr');
const sendEmail = require('./sendEmail');

module.exports = {
  UpsErrors,
  ctrlWraper,
  mongooseErr,
  sendEmail
};
