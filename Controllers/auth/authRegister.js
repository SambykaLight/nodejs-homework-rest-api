const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { UpsErrors, ctrlWraper, sendEmail } = require("../../Helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw UpsErrors(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  //  Verification Email
  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<h3>Thank you for registering!</h3><p>Please click on
    <a href="http://localhost:${process.env.PORT}/api/auth/verify
    /${verificationToken}">this link</a></p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = ctrlWraper(register);
