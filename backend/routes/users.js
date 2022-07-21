const userRoutes = require('express').Router();
const {
  getUsers,
  updateProfile,
  updateAvatar,
  getUserByID,
  getUserInfo,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateAvatar,
} = require('../middlewares/validation');

userRoutes.get('/users', getUsers);

userRoutes.get('/users/me', getUserInfo);

userRoutes.get('/users/:userId', validateUserId, getUserByID);

userRoutes.patch('/users/me', validateUpdateProfile, updateProfile);

userRoutes.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = userRoutes;
