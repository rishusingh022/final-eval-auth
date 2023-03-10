const authServices = require('../services/auth.services.js');
const { HTTPError } = require('../utils/errorHandler.js');

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authServices.registerUser(email, password);
    res.status(201).json({
      message: 'User created successfully',
      data: user,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authServices.loginUser(email, password);
    if (!user) throw new HTTPError('User not found', 404);
    res.status(200).json({
      message: 'User logged in successfully',
      data: user,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

const validateUserToken = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await authServices.validateUserToken(token);
    if (!user) throw new HTTPError('token not valid', 401);
    res.status(200).json({
      message: 'User validated successfully',
      data: user,
    });
  } catch (error) {
    if (error instanceof HTTPError) {
      res.status(error.code).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateUserToken,
};
