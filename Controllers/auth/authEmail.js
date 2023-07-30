const { ctrlWraper, UpsErrors } = require("../../Helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw UpsErrors(401, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ''});
  res.json({
    message:'success' 
  })
};

module.exports = ctrlWraper(verifyEmail);
