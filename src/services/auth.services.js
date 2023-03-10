const db = require('../../database/models');
const { HTTPError } = require('../utils/errorHandler');
const { encryptPassword } = require('../utils/encryptPassword');
const jwt = require('jsonwebtoken');

const { getRedisClient } = require('../utils/redis');

const registerUser = async (email, password) => {
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  if (user) throw new HTTPError('User already exists', 400);
  const encryptedPassword = await encryptPassword(password);
  const newUser = await db.user.create({
    email,
    password: encryptedPassword,
  });
  return newUser;
};

const loginUser = async (email, password) => {
  const redisClient = await getRedisClient();
  const user = await db.user.findOne({
    where: {
      email,
    },
  });
  if (!user) throw new HTTPError('User not found', 404);
  const hashPassword = await encryptPassword(password);
  if (hashPassword !== user.password)
    throw new HTTPError('Password incorrect', 400);
  const token = jwt.sign(
    { id: user.id, email: user.email },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: '1h',
    }
  );
  await redisClient.set(token, user.id);
  return token;
};

const validateUserToken = async (token) => {
  const redisClient = await getRedisClient();
  const userId = await redisClient.get(token);
  if (!userId) throw new HTTPError('token not valid', 401);
  const decodedUser = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  return decodedUser;
};

module.exports = {
  registerUser,
  loginUser,
  validateUserToken,
};
