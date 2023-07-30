const { UpsErrors, ctrlWraper, sendEmail } = require("../../Helpers");
const { User } = require("../../models/user");
const { nanoid } = require("nanoid");

const verificationToken = nanoid();

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw UpsErrors(401, "Email not found");
  }
  if (user.veryfy) {
    throw UpsErrors(401, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<h3>Thank you for registering!</h3><p>Please click on
            <a href="http://localhost:${process.env.PORT}/api/auth/verify
            /${verificationToken}">this link</a></p>`,
  };
  await sendEmail(verifyEmail);

  res.json({
    message: "Verification Email sent",
  });
};

module.exports = ctrlWraper(resendVerifyEmail);
