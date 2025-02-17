const register = require("./authRegister");
const login = require("./authLogin");
const current = require("./authCurrent");
const logout = require("./authLogOut");
const update = require('./authUpdate');
const updateAvatar = require('./authAvatar');
const verifyEmail = require('./authEmail');
const resendVerifyEmail = require('./authResend')


module.exports = {
  register,
  login,
  current,
  logout,
  update,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail
};
