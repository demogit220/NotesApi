const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, // only alows to send cookies on https
    httpOnly: true, // cookie can not be accesed and modified in any way by the browser, preventing cross-site scripting attacks
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // passwordConfirm: req.body.passwordConfirm,
  });
  //   console.log(newUser);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) next(Error("Please provide email or password"));

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(Error("Incorrect email or password"));
    }

    createSendToken(user, 200, res);
})